const express = require("express")
const {activity_Log} = require("./middleware/activity_Log");
const Lead_Routes = require("./routes/Lead_Routes");
const Analysis_Routes  = require("./routes/AnalysisRoutes");
const LogRoutes = require("./routes/LogRoutes");
const app = express();




app.use(express.json());
app.use(activity_Log);



app.use("/lead",Lead_Routes);
app.use("/analysis",Analysis_Routes);
app.use("/logs",LogRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Port Active At ${PORT}`);
}) 