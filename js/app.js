let groupSize = document.getElementById("groupSize");
let sizeVal = document.getElementById("sizeVal");
let groupNum = document.getElementById("groupNum");
let numVal = document.getElementById("numVal");
let addBtn = document.getElementById("addBtn");
let randBtn = document.getElementById("randBtn");
let genBtn = document.getElementById("genBtn");
let refBtn = document.getElementById("refBtn");
let listName = document.getElementById("listName");


groupNum.oninput = function () {
    numVal.innerHTML = this.value;
}

groupSize.oninput = function () {
    sizeVal.innerHTML = this.value;
}

const genList = (array) => {
    nameList.innerHTML = '';
    array.map(name => {
        let button = document.createElement('button');
        let buttonClasses = ["p-5", "bg-gray-300", "w-fit", "h-fit", "font-bold", "border-2", "border-black", "hover:bg-gray-400", "justify-self-center", "self-center"]
        buttonClasses.map(clas => {
            button.classList.add(clas)
        })
        button.innerHTML = name;
        button.addEventListener('click', () => {
            removeLS(button.innerHTML, nameArray)
        })

        nameList.appendChild(button);
    })

}

const genGroups = (array) => {
    if (groupSize.value > array.length) {
        alert('The group size is too large for your list of names.')
        staticmodal.style.display = 'none';
        window.location.reload();
    }
    else if (groupNum.value > array.length / groupSize.value) {
        alert('The number of groups is incorrect for the other settings')
        staticmodal.style.display = 'none';
        window.location.reload();
    }
    else {
        modBody.innerHTML = '';
        //It generates an array for each of the groups then it grabs a value from 
        for (let i = 0; i < groupNum.value; i++) {
            let groupnumber = i + 1;
            let group = [];
            for (let x = 0; x < groupSize.value; x++) {
                let nameList = nameArray;
                console.log()
                let gRand = Math.floor(Math.random() * nameList.length);
                let x = nameList.splice(gRand, 1);
                let number = x[0]
                group.push(number)


            }
            let p = document.createElement('p')
            let pClasses = ['text-base', 'leading-relaxed', 'text-gray-500']
            pClasses.map(clas => {
                p.classList.add(clas)
            })
            p.innerHTML = `group ${groupnumber} = ${group}`
            modBody.appendChild(p)
        }
    }
}

addBtn.addEventListener('click', () => {
    if (addInput.value) {
        saveLS(addInput.value)
    }
    else { alert('You have to input a name.') }
})

randBtn.addEventListener('click', () => {
    const sizeRand = Math.floor(Math.random() * 20);
    const groupsRand = Math.floor(Math.random() * 20);
    groupSize.value = sizeRand;
    groupNum.value = groupsRand;
    sizeVal.innerHTML = groupSize.value;
    numVal.innerHTML = groupNum.value;
})

listName.addEventListener('click', () => {
    removeLS(listName.innerHTML, nameArray)
})

genBtn.addEventListener('click', () => {
    genGroups(nameArray);
})

refBtn.addEventListener('click', () => {
    window.location.reload();
})


const saveLS = (name) => {
    nameArray = getLS()
    nameArray.push(name)
    localStorage.setItem('names', JSON.stringify(nameArray));
    genList(nameArray);
}

const getLS = () => {
    let lsData = localStorage.getItem('names');
    if (lsData == null) {
        return []
    } else {
        return JSON.parse(lsData);
    }
}

const removeLS = (name, nameArray) => {
    let namedIndex = nameArray.indexOf(name);
    nameArray.splice(namedIndex, 1);
    localStorage.setItem('names', JSON.stringify(nameArray));
    genList(nameArray);
}

let nameArray = getLS();
genList(nameArray);