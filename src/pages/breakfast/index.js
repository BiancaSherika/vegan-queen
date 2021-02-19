import React, { useEffect, useState } from 'react';


const Breakfast = () => {

    const token = localStorage.getItem("token")
    const [menu, setMenu] = useState('');
    const [finalPrice] = useState(0);  
   

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
          const breakfast = json.filter(item => item.type === 'breakfast')
          setMenu(breakfast)
        })
      }, [])
      
     
  
  

  return (
    <div className="Breakfast">
      <div className="MenuBreakfast">

        {menu && menu.map((item, menu) => (
          <div className="printScreen" key={item.name} name={item.name} id={item.id} price={item.price}>
            <h1 className="nameProduct">{item.name}</h1>
            <h1 className="priceItem">R$ {item.price},00</h1>
            <button className="btnAdd"> Adicionar</button>
          </div>
        ))}
        <div className="divOrders">
          <div className="divOrder">
            <h1 className="divOrder">Pedido:</h1>
            <div> 
            <button  className='btnDelete'>X</button>                    
            </div>         
                    
           <h3>{finalPrice}</h3>  
          </div>
          
          <button className="btnFinal">Finalizar</button>
         
          
        </div>
      </div>
    </div>
  );
}

export default Breakfast;

