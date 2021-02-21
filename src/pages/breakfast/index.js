import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import InnerHeader from '../../components/InnerHeader';



const Breakfast = () => {

    const history = useHistory();
    const token = localStorage.getItem("token")
    const [menu, setMenu] = useState('');    
     const professional = localStorage.getItem("name");

   
    useEffect (() => {
        fetch('https://lab-api-bq.herokuapp.com/products', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
            },
        })
        .then((response) => response.json())
        .then((json) => {
          console.log (json)
          const breakfast = json.filter(item => item.type === 'breakfast')
          
          setMenu(breakfast)
       

        })
      })


    return (
        <>
        <div className="Breakfast">
        <InnerHeader professional={professional}/>
        <div className="MenuBreakfast">
        {menu && menu.map((item) => (
          <div className="printScreen" name={item.name} id={item.id} price={item.price}>
            <h1 className="nameProduct">{item.name}</h1>
            <h1 className="priceItem">R$ {item.price},00</h1>
            <button className="btnAdd" > Adicionar </button>
          </div>

        ))}

          <div className="routePageBurger">
            <button type="submit"
            onClick={() => history.push('/burger')}
            >Burger</button>
          </div>
             
          <button className="btnFinal" >Finalizar</button>          
       

      </div>
    </div>
    </>
  );
}

export default Breakfast;
