export const trunc = (str) => {
  if (str.length > 250) {
    const subStr = str.substr(0, 250);
    return subStr.substr(0, subStr.lastIndexOf(' ')) + '...';
  }
  return str; 
};

export const isOverdue = (dueDate) => {
  const due = new Date(dueDate).getTime();
  const now = new Date().getTime();

  if(due > now){
    return false;
  }
  return true;
};