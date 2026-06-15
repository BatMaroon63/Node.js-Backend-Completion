const { v4: uuidv4 } = require("uuid");

const  {
    validEmail,
    validScore,
    validSource
} = require("../utils/validation");
const leads = require("../data/leads");

const Import_leads = (req, res)=> {
    const Incoming_Leads = req.body;

    if(!Array.isArray(Incoming_Leads)) {
        return res.status(400).json({
            message: "Body must be in an Array."
        });
    };

    let Imported = 0;
    let Skipped = 0;

    const Requested_emails = new Set();

    Incoming_Leads.forEach((lead) => {
        const {
            name,
            email,
            company,
            source,
            score
        } = lead;
        if( !name || !email || !company || source === undefined || score === undefined) {
                Skipped++;
                return;
        }

        if (!validEmail(lead.email)) {
             Skipped++;
             return;
        }

        if(!validScore(score)) {
            Skipped++;
            return;
        }

        if(!validSource(source)) {
            Skipped++;
            return;
        }

        if(Requested_emails.has(email)) {
            Skipped++;
            return;
        }

        const Already_exist = leads.some(
            l => l.email === email
        );

        if(Already_exist) {
            Skipped++;
            return;
        }

        Requested_emails.add(email);

        leads.push({
            id: uuidv4(),
            name,
            email,
            company,
            source,
            score,
            created_At: new Date().toISOString()
        });

        Imported++;
    });

    res.json({
        Imported,
        Skipped
    });
};

module.exports = {
    Import_leads
};
