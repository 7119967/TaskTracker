
export const readOnly = (str) => {
  let value = str === undefined ? "" : str;
  return value;
};

export const makeLowerCaseRemoveSpace = (str) => {
  let value = typeof str === 'string' ? str.toLowerCase() : '';
  return value.toLowerCase().replace(" ", "");
};

export const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    
    return [year, month, day].join('-');
  }

  export const capitalizeText = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  export const priorities = [
    { value: "", text: "Choose ..." },
    { value: "1", text: "High" },
    { value: "2", text: "Middle" },
    { value: "3", text: "Low" },
  ];
  
  export const projectStatuses = [
    { value: "", text: "Choose ..." },
    { value: "0", text: "Not Started" },
    { value: "1", text: "Active" },
    { value: "2", text: "Completed" },
  ];

  export const taskStatuses = [
    { value: "", text: "Choose ..." },
    { value: "0", text: "To Do" },
    { value: "1", text: "In Progress" },
    { value: "2", text: "Done" },
  ];

  export const initTask = {
    create: formatDate(Date.now()),
    modify: formatDate(Date.now()),
    name: "",
    priority: "",
    status: "",
    description: ""
  };   

  export const initProject = {
    name: "",
    create: formatDate(Date.now()),
    modify: formatDate(Date.now()),
    startDate: formatDate(Date.now()),
    completionDate: "",
    priority: "",
    status: "",
    tasks: []
  }

  export const getDefaultPriority = (str) => {
    let value = typeof str === 'string' ? str.toLowerCase() : "";
    
    for (const item of priorities) {
      if (makeLowerCaseRemoveSpace(value) === makeLowerCaseRemoveSpace(item.text)) {
        return value = item.text
      }
    }

    if (makeLowerCaseRemoveSpace(value) === "") {
      return value = "Choose ..."
    }
  }

  export const getDefaultProjectStatus = (str) => {
    let value = typeof str === 'string' ? str.toLowerCase() : "";
    
    projectStatuses.filter((item) => {
      if (makeLowerCaseRemoveSpace(value) === makeLowerCaseRemoveSpace(item.text)) {
        return value.toLowerCase().replace(" ", "")
      }
      return value.toLowerCase().replace(" ", "")
    })
    
  }

  export const getDefaultTaskStatus = (str) => {
    let value = typeof str === 'string' ? str.toLowerCase() : "";
    
    taskStatuses.filter((item) => {
      if (makeLowerCaseRemoveSpace(value) === makeLowerCaseRemoveSpace(item.text)) {
        return value.toLowerCase().replace(" ", "")
      }
      return value.toLowerCase().replace(" ", "")
    })
    
  }