let isActivated = true; 

function toggleState(currentState) {
    return !currentState;
}

function runTask4() {

    console.log("Стан до натискання:", isActivated);

    isActivated = toggleState(isActivated);
    
    console.log("Стан після натискання:", isActivated);
}