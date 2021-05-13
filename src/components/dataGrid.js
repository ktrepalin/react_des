import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import ReactDataGrid from '@inovua/reactdatagrid-community'
import "@inovua/reactdatagrid-community/index.css";

import { getStorageObjects, getObjectAttrs } from '../api/requests';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: '100%',
    minHeight: '100%',
    height: '100%'
  },
  // main: {
  //   minWidth: '100%',
  //   minHeight: '100vh',
  //   margin: 'auto',
  // },
  // work: {
  //   margin: 'auto',
  //   display: 'block',
  //   maxWidth: '100%',
  //   height: '100%',
  // },
  divider:{
    minHeight: '1vh',
    backgroundColor: '#EBEDEF'
  },
  papper: {
    // display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
    margin: 'auto',
    fontSize: '14px',
    minHeight: 'calc(100vh - 134px)',
    maxHeight: 'calc(100vh - 134px)',
    height: 'calc(100vh - 134px)',
  },
  header: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor:'#FFFFFF',
    margin: 'auto',
    width: '100%',
    maxHeight: '30px',
    minHeight: '30px'
  },
  tittle:{
    fontSize: '16px',
    marginLeft: theme.spacing(1),
    marginTop: '2px',
    fontWeight: 500,
  }

}));




function ObjectList(props) {
  const gridStyle = { height: '30%', width: '100%' }

  const columns = [{"name":"ID","header":"ID","defaultFlex":1},{"name":"name","header":"Наименование","defaultFlex":2},{"name":"class","header":"Класс","defaultFlex":1}]
  const filters = [{"name":"ID","operator":"contains","type":"string","value":""},{"name":"name","operator":"contains","type":"string","value":""},{"name":"class","operator":"contains","type":"string","value":""}]
  const rows = props.rows
  // const rows = [{"uniqueId":1,"ID":200100135115,"name":"Ирландское транспорт. общество","class":"User::ОнтК_Дорога"},{"uniqueId":2,"ID":200100135114,"name":"Чешские железные дороги","class":"User::ОнтК_Дорога"},{"uniqueId":3,"ID":200100135113,"name":"Болгарские Государственные ж.д","class":"User::ОнтК_Дорога"},{"uniqueId":4,"ID":200100135112,"name":"Жел. дор. Боснии и Герцеговины","class":"User::ОнтК_Дорога"},{"uniqueId":5,"ID":200100135119,"name":"Британские железные дороги","class":"User::ОнтК_Дорога"},{"uniqueId":6,"ID":200100135118,"name":"Железные дороги Македонии","class":"User::ОнтК_Дорога"},{"uniqueId":7,"ID":200100135117,"name":"Железные дороги Черногории","class":"User::ОнтК_Дорога"},{"uniqueId":8,"ID":200100135116,"name":"Корейская желдор корпорация","class":"User::ОнтК_Дорога"},{"uniqueId":9,"ID":200100135107,"name":"Вьетнамские железные дороги","class":"User::ОнтК_Дорога"},{"uniqueId":10,"ID":200100135111,"name":"Жд Рес Сербской(Босн и Герцег)","class":"User::ОнтК_Дорога"},{"uniqueId":11,"ID":200100135110,"name":"Японские железные дороги","class":"User::ОнтК_Дорога"},{"uniqueId":12,"ID":200100135109,"name":"Албанские железные дороги","class":"User::ОнтК_Дорога"},{"uniqueId":13,"ID":200100135108,"name":"Индийские железные дороги","class":"User::ОнтК_Дорога"},{"uniqueId":14,"ID":200100135131,"name":"Железные дороги Нидерландов","class":"User::ОнтК_Дорога"},{"uniqueId":15,"ID":200100135130,"name":"Итальянские государственные жд","class":"User::ОнтК_Дорога"},{"uniqueId":16,"ID":200100135129,"name":"Нац общество Люксембургских жд","class":"User::ОнтК_Дорога"},{"uniqueId":17,"ID":200100135128,"name":"Австрийские железные дороги","class":"User::ОнтК_Дорога"},{"uniqueId":18,"ID":200100135135,"name":"Железные дороги Бельгии","class":"User::ОнтК_Дорога"},{"uniqueId":19,"ID":200100135134,"name":"Нац общество Французских жд","class":"User::ОнтК_Дорога"},{"uniqueId":20,"ID":200100135133,"name":"Датские государственные жд","class":"User::ОнтК_Дорога"},{"uniqueId":21,"ID":200100135132,"name":"Швейцарские Федеральные жд","class":"User::ОнтК_Дорога"},{"uniqueId":22,"ID":200100135123,"name":"Шведские железные дороги","class":"User::ОнтК_Дорога"},{"uniqueId":23,"ID":200100135122,"name":"Организация Греческих ж. д.","class":"User::ОнтК_Дорога"},{"uniqueId":24,"ID":200100135121,"name":"Железные дороги Сербии","class":"User::ОнтК_Дорога"},{"uniqueId":25,"ID":200100135120,"name":"Адм.ж.д.инфраструктуры Испании","class":"User::ОнтК_Дорога"},{"uniqueId":26,"ID":200100135127,"name":"Немецкие железные дороги","class":"User::ОнтК_Дорога"},{"uniqueId":27,"ID":200100135126,"name":"Железные дороги Словении","class":"User::ОнтК_Дорога"},{"uniqueId":28,"ID":200100135125,"name":"Железные дороги Хорватии","class":"User::ОнтК_Дорога"},{"uniqueId":29,"ID":200100135124,"name":"Норвежская нац желдор админист","class":"User::ОнтК_Дорога"},{"uniqueId":30,"ID":200100116075,"name":"ФГУП 'Крымская железная дор'","class":"User::ОнтК_Дорога"},{"uniqueId":31,"ID":200100116074,"name":"Туркменская","class":"User::ОнтК_Дорога"},{"uniqueId":32,"ID":200100116073,"name":"Таджикская","class":"User::ОнтК_Дорога"},{"uniqueId":33,"ID":200100116072,"name":"Узбекские","class":"User::ОнтК_Дорога"},{"uniqueId":34,"ID":200100135144,"name":"Железные дороги Ирака","class":"User::ОнтК_Дорога"},{"uniqueId":35,"ID":200100116078,"name":"Улан-Баторская железная дорога","class":"User::ОнтК_Дорога"},{"uniqueId":36,"ID":200100116077,"name":"Железные дороги КНДР","class":"User::ОнтК_Дорога"},{"uniqueId":37,"ID":200100116076,"name":"АК 'Железные дороги Якутии'","class":"User::ОнтК_Дорога"},{"uniqueId":38,"ID":200100116067,"name":"Молдавская","class":"User::ОнтК_Дорога"},{"uniqueId":39,"ID":200100135139,"name":"Нац управление жел дор Марокко","class":"User::ОнтК_Дорога"},{"uniqueId":40,"ID":200100135138,"name":"Национальное общ-во жд Алжира","class":"User::ОнтК_Дорога"},{"uniqueId":41,"ID":200100135137,"name":"Национальное общ-во жд Туниса","class":"User::ОнтК_Дорога"},{"uniqueId":42,"ID":200100135136,"name":"Египетские государственные жд","class":"User::ОнтК_Дорога"},{"uniqueId":43,"ID":200100116071,"name":"Кыргызская","class":"User::ОнтК_Дорога"},{"uniqueId":44,"ID":200100135143,"name":"Железные дороги Ливана","class":"User::ОнтК_Дорога"},{"uniqueId":45,"ID":200100116070,"name":"Грузинская","class":"User::ОнтК_Дорога"},{"uniqueId":46,"ID":200100135142,"name":"Сирийские железные дороги","class":"User::ОнтК_Дорога"},{"uniqueId":47,"ID":200100116069,"name":"ЗАО 'Южно-Кавказская ж.д.'","class":"User::ОнтК_Дорога"},{"uniqueId":48,"ID":200100135141,"name":"Израильские железные дороги","class":"User::ОнтК_Дорога"},{"uniqueId":49,"ID":200100116068,"name":"Одесская","class":"User::ОнтК_Дорога"},{"uniqueId":50,"ID":200100135140,"name":"Нац жел дор сеть Португалии","class":"User::ОнтК_Дорога"},{"uniqueId":51,"ID":200100116089,"name":"Железные дороги Словацкой Респ","class":"User::ОнтК_Дорога"},{"uniqueId":52,"ID":200100116088,"name":"Венгерские государственные ж.д","class":"User::ОнтК_Дорога"},{"uniqueId":53,"ID":200100116094,"name":"Афганская железная дорога","class":"User::ОнтК_Дорога"},{"uniqueId":54,"ID":200100116086,"name":"Румынские железные дороги","class":"User::ОнтК_Дорога"},{"uniqueId":55,"ID":200100116100,"name":"Турецкие железные дороги","class":"User::ОнтК_Дорога"},{"uniqueId":56,"ID":2000035047,"name":"Китайские железные дороги","class":"User::ОнтК_Дорога"},{"uniqueId":57,"ID":2000035044,"name":"Польские железные дороги","class":"User::ОнтК_Дорога"},{"uniqueId":58,"ID":2000035045,"name":"Финские государственные ж.д.","class":"User::ОнтК_Дорога"},{"uniqueId":59,"ID":2000035042,"name":"Забайкальская","class":"User::ОнтК_Дорога"},{"uniqueId":60,"ID":2000035043,"name":"Дальневосточная","class":"User::ОнтК_Дорога"},{"uniqueId":61,"ID":2000035040,"name":"Красноярская","class":"User::ОнтК_Дорога"},{"uniqueId":62,"ID":2000035041,"name":"Восточно-Сибирская","class":"User::ОнтК_Дорога"},{"uniqueId":63,"ID":200100116119,"name":"Иранские государственные ж.д.","class":"User::ОнтК_Дорога"},{"uniqueId":64,"ID":2000035030,"name":"Белорусская","class":"User::ОнтК_Дорога"},{"uniqueId":65,"ID":2000035031,"name":"Литовская","class":"User::ОнтК_Дорога"},{"uniqueId":66,"ID":2000035028,"name":"Горьковская","class":"User::ОнтК_Дорога"},{"uniqueId":67,"ID":2000035029,"name":"Московская","class":"User::ОнтК_Дорога"},{"uniqueId":68,"ID":2000035026,"name":"Юго-Западная","class":"User::ОнтК_Дорога"},{"uniqueId":69,"ID":2000035027,"name":"Северная","class":"User::ОнтК_Дорога"},{"uniqueId":70,"ID":2000035025,"name":"Львовская","class":"User::ОнтК_Дорога"},{"uniqueId":71,"ID":2000035038,"name":"Южно-Уральская","class":"User::ОнтК_Дорога"},{"uniqueId":72,"ID":2000035039,"name":"Западно-Сибирская","class":"User::ОнтК_Дорога"},{"uniqueId":73,"ID":2000035037,"name":"Свердловская","class":"User::ОнтК_Дорога"},{"uniqueId":74,"ID":2000035034,"name":"Эстонская","class":"User::ОнтК_Дорога"},{"uniqueId":75,"ID":2000035035,"name":"Октябрьская","class":"User::ОнтК_Дорога"},{"uniqueId":76,"ID":2000035032,"name":"Калининградская","class":"User::ОнтК_Дорога"},{"uniqueId":77,"ID":2000035033,"name":"Латвийская","class":"User::ОнтК_Дорога"},{"uniqueId":78,"ID":2000035014,"name":"Приволжская","class":"User::ОнтК_Дорога"},{"uniqueId":79,"ID":2000035015,"name":"Юго-Восточная","class":"User::ОнтК_Дорога"},{"uniqueId":80,"ID":2000035012,"name":"Казахстанская","class":"User::ОнтК_Дорога"},{"uniqueId":81,"ID":2000035013,"name":"Куйбышевская","class":"User::ОнтК_Дорога"},{"uniqueId":82,"ID":2000035022,"name":"Южная","class":"User::ОнтК_Дорога"},{"uniqueId":83,"ID":2000035020,"name":"Донецкая","class":"User::ОнтК_Дорога"},{"uniqueId":84,"ID":2000035021,"name":"Приднепровская","class":"User::ОнтК_Дорога"},{"uniqueId":85,"ID":2000035018,"name":"Азербайджанская","class":"User::ОнтК_Дорога"},{"uniqueId":86,"ID":2000035019,"name":"Северо-Кавказская","class":"User::ОнтК_Дорога"}]



  return (

   <ReactDataGrid
    style={gridStyle}
    rowHeight={30}
    idProperty="uniqueId"
    columns={columns}
    dataSource={rows}
    showColumnMenuTool={false}
    defaultFilterValue={filters}
    enableSelection={true}
    onSelectionChange={props.onSelectionChange}
  />
  );
}

function AttrsList(props) {
  const gridStyle = { height: '68%', width: '100%'}

  const columns = [{"name":"name","header":"Наименование","defaultFlex":1},{"name":"value","header":"Значение","defaultFlex":2},{"name":"type","header":"Тип","defaultFlex":1}]
  const rows = props.rows

  return (

   <ReactDataGrid
    style={gridStyle}
    rowHeight={30}
    idProperty="uniqueId"
    columns={columns}
    dataSource={rows}
    showColumnMenuTool={false}
  />
  );
}




export default function ObjectViewTable(props) {
  const classes = useStyles();
  const name = props.name

  const [objects, setObjects] = useState([]);
  // const [selected, setSelected] = useState(null);
  const [attrs, setAttrs] = useState([]);

  const onSelectionChange = useCallback(({ selected }) => {
    // setSelected(selected)
    getObjectAttrs((objects[selected-1]).ID, setAttrs)

  }, [objects])

  const onButtonClick = ((event) => {
    getStorageObjects(name, setObjects)
  });


  return (
  <div className={classes.root}>
    <div className={classes.header}>
      <Button
        style={{maxHeight: '30px', minHeight: '30px', textTransform: 'none'}}
        onClick={onButtonClick}
        startIcon={<RefreshRoundedIcon />}
      >
        Обновить
      </Button>
    </div>
    <Paper component="form" className={classes.papper} elevation={4} >
      <ObjectList rows={objects} onSelectionChange={onSelectionChange} />
      <Divider className={classes.divider} light={true}/>
      <AttrsList rows={attrs}/>
    </Paper>
  </div>
  );
}


