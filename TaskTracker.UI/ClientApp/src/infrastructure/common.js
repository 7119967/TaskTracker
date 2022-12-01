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

    // console.log(new Date(date).toLocaleDateString())
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
    taskStatus: "",
    description: ""
  };   

  export const initProject = {
    name: "",
    create: formatDate(Date.now()),
    modify: formatDate(Date.now()),
    startDate: formatDate(Date.now()),
    completionDate: "",
    priority: "",
    projectStatus: "",
    tasks: []
  }