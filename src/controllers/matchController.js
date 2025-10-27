import University from '../models/University.js';

export const matchUniversities = async (req, res) => {
  try {
    const { gmat_score, gpa, work_exp = 0, program_type } = req.body;

    if (gmat_score == null || gpa == null || !program_type) {
      return res.status(400).json({ error: 'GMAT, GPA, and program type are required' });
    }

    const universities = await University.findAll({
      where: { program_type }
    });

    const MAX_DIFF = {
      gmat: 100,      
      gpa: 0.6,       
      work: 5         
    };

    const WEIGHTS = {
      gmat: 0.5,
      gpa: 0.3,
      work: 0.2
    };

    const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));

    const scored = universities.map(uni => {
      const avgGmat = Number(uni.avg_gmat) || 0;
      const avgGpa = parseFloat(uni.avg_gpa) || 0;
      const avgWork = Number(uni.work_exp_avg) || 0;

      // differences
      const gmatDiff = gmat_score - avgGmat;     
      const gpaDiff = gpa - avgGpa;
      const workDiff = work_exp - avgWork;

      const metricScore = (userDiff, maxDiff) => {
        if (isNaN(userDiff)) return 0;
        if (userDiff >= 0) {
          return 100;
        }
        const below = Math.abs(Math.min(0, userDiff));
        const pct = (below / maxDiff) * 100;
        return clamp(100 - pct, 0, 100);
      };

      const gmatScore = metricScore(gmatDiff, MAX_DIFF.gmat);
      const gpaScore = metricScore(gpaDiff, MAX_DIFF.gpa);
      const workScore = metricScore(workDiff, MAX_DIFF.work);

      let rawScore = gmatScore * WEIGHTS.gmat + gpaScore * WEIGHTS.gpa + workScore * WEIGHTS.work;
      let score = Math.round(clamp(rawScore, 0, 100));

      const VERY_LOW_THRESHOLD = 35;
      if (gmatScore < VERY_LOW_THRESHOLD || gpaScore < VERY_LOW_THRESHOLD || workScore < VERY_LOW_THRESHOLD) {
        score = Math.max(0, score - 8); 
      }

      const totalAbsDiff = Math.abs(gmatDiff) + Math.abs(gpaDiff) * 100 + Math.abs(workDiff) * 10;

      const suggestions = [];
      if (gmatDiff < 0) {
        const need = Math.ceil(Math.abs(gmatDiff));
        suggestions.push(`Increase GMAT by ${need} point${need > 1 ? 's' : ''}`);
      }
      if (gpaDiff < 0) {
        const need = Math.abs(gpaDiff).toFixed(2);
        suggestions.push(`Improve GPA by ${need}`);
      }
      if (workDiff < 0) {
        const need = Math.ceil(Math.abs(workDiff));
        suggestions.push(`Gain ${need} more year${need > 1 ? 's' : ''} of work experience`);
      }

      return {
        id: uni.id,
        name: uni.name,
        score,
        details: {
          gmat: { user: gmat_score, avg: avgGmat, status: gmatDiff >= 0 ? 'above avg' : 'below avg', metricScore: Math.round(gmatScore) },
          gpa: { user: gpa, avg: avgGpa, status: gpaDiff >= 0 ? 'above avg' : 'below avg', metricScore: Math.round(gpaScore) },
          work_exp: { user: work_exp, avg: avgWork, status: workDiff >= 0 ? 'good' : 'needs improvement', metricScore: Math.round(workScore) }
        },
        suggestion: suggestions.length ? suggestions.join('; ') : "You are a good fit",

        _meta: {
          rawScore,
          totalAbsDiff
        }
      };
    });

    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a._meta.totalAbsDiff - b._meta.totalAbsDiff;
    });

    const out = scored.slice(0, 20).map(({ _meta, ...rest }) => rest);

    res.json(out);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
