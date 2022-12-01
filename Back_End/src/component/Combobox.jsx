import Combobox from "react-widgets/Combobox";

let colors = [
    { id: 0, name: 'orange'},
    { id: 1, name: 'purple'},
    { id: 2, name: 'red' },
    { id: 3, name: 'blue' },
  ];
  
  let widget = (
    <Combobox
      data={colors}
      dataKey='id'
      textField='name'
      defaultValue={1}
    />
  )
  
  render(widget);