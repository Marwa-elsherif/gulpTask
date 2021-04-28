class Person {
    constructor(fname, lname,adress) {
       this.fname = fname;
       this.lname = lname;
       this.adress=adress;
    }
 
    get name() {
       return this.fname +"-"+this.lname;
    }
 }
 console.log(new Person("marwa","tag","qena"));
