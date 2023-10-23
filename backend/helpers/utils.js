exports.getCurrentDateTime=()=> {
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    
    return new Date().toLocaleString('en-IN', options);
  }

 exports.calculate_accuracy = (noOfCorrectQues, noOfPartialQues, noOfIncorrectQues, noOfTotalQues) => {
    let accuracy = ((noOfCorrectQues + 0.5 * noOfPartialQues - noOfIncorrectQues) / noOfTotalQues) * 100;
    return accuracy;
  
  }

  exports.arraySortByOrder=(array)=>{
    array.sort((a, b) => {
      const nameA = a.order; // Convert names to uppercase for case-insensitive sorting
      const nameB = b.order;
    
      if (nameA < nameB) {
        return -1; // nameA comes before nameB
      } else if (nameA > nameB) {
        return 1; // nameA comes after nameB
      }
    
      return 0; // names are equal
    });
  
    return array;
  }

  // Function to check if arrayA is a subset of arrayB
  exports.isSubset=(arrayA, arrayB)=>{
    return arrayA.every(item => arrayB.includes(item));
  }