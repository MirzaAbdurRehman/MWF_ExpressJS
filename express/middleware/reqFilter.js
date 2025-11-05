

const reqFilter = (req, res, next) => {
    const age =  req.query.age;

    if(!age){
        res.send('Age Paramter Not Found!...')
    } else if(age < 16){
        res.send('Sorry Your Age is Less than 16')
    }else {
        next();
    }
}


module.exports = reqFilter;