function compareObjects(obj1, obj2) {

    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true; 
}


let student1 = { name: "Oleksii", group: "IT-21" };
let student2 = { name: "Oleksii", group: "IT-21" };
let student3 = { name: "Ivan", group: "IT-21" };

console.log("student1 і student2 однакові?", compareObjects(student1, student2));
console.log("student1 і student3 однакові?", compareObjects(student1, student3));