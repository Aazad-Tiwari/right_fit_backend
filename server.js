import express from 'express';
import matchRoutes from './src/routes/match.js'
import cors from 'cors'
import 'dotenv/config'



const app = express();
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 5000;


app.use('/api/match', matchRoutes);

app.get('/', (req,res) => (
    res.send("app is running")
))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
