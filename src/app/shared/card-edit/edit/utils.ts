export function upperInitials(name){
  return name.match(/(\b\S)?/g).join("").toUpperCase().replace('\(', '').replace('\)', '').replace(',','').replace('\/', '');
}
