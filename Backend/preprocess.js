function isLetter(s) {
    return s.length === 1 && s.match(/[a-zA-Z\s]+/);
}

export const preprocessedData = (str) => {
    const mapp = new Map();

    var name = "Name";
    var lname = "Last";

    var startidx = str.search(name);
    var endidx = str.search(lname);

    let substring = str.substring(startidx + 5, endidx);

    mapp["firstName"] = substring;



    let res = "";
    let ls = "Last name ";
    let st = str.search(ls);
    for (let i = st + 10; i < str.length && isLetter(str[i]) ; i++){
        
        res += str[i];
    }
    res.p
    mapp["lastName"] = res;

    let ipstr = str;
    let dobP = /\b\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(\.|) \d{4}\b/g;
    let matcheddate = ipstr.match(dobP );
    
        mapp["dob"] = matcheddate[0];
        mapp["doi"] = matcheddate[2];
        mapp["doe"] = matcheddate[1];
        
    

    let pattern = /\d \d{4} \d{5} \d{2}/;
    let matchedNumber = str.match(pattern);

    mapp['identification'] = matchedNumber[0];

    
    const jsonOcr = {
        identificationNumber : matchedNumber[0],
        firstName : substring,
        lastName : res,
        dateOfBirth : matcheddate[0],
        dateOfIssue: matcheddate[1],
        dateOfExpiry : matcheddate[2],
    }


        console.log(jsonOcr);
        return jsonOcr;
}

