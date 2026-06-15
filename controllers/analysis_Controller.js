const leads = require("../data/leads");

const topCompanies = (req, res) => {

    const companyCount = {};

    leads.forEach((lead) => {
        companyCount[lead.company] =
            (companyCount[lead.company] || 0) + 1;
    });

    const result = Object.entries(companyCount)
        .map(([company, leadCount]) => ({
            company,
            leadCount
        }))
        .sort((a, b) => b.leadCount - a.leadCount)
        .slice(0, 5);

    res.status(200).json(result);
};

const score_Distribution = (req, res) => {

    const distribution = {
        "0-25": 0,
        "26-50": 0,
        "51-75": 0,
        "76-100": 0
    };

    leads.forEach((lead) => {

        if (lead.score <= 25)
            distribution["0-25"]++;

        else if (lead.score <= 50)
            distribution["26-50"]++;

        else if (lead.score <= 75)
            distribution["51-75"]++;

        else
            distribution["76-100"]++;
    });

    res.status(200).json(distribution);
};

const conversion = (req, res) => {

    const { minScore } = req.body;

    const qualifiedLeads = leads.filter(
        lead => lead.score >= minScore
    );

    let expectedConversions = 0;

    qualifiedLeads.forEach((lead) => {

        if (lead.score >= 90)
            expectedConversions += 0.8;

        else if (lead.score >= 80)
            expectedConversions += 0.5;

        else if (lead.score >= 70)
            expectedConversions += 0.3;
    });

    res.status(200).json({
        qualifiedLeads: qualifiedLeads.length,
        expectedConversions
    });
};

module.exports = { 
    topCompanies,
    score_Distribution,
    conversion
};