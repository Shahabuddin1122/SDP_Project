import React,{ useState,useEffect, useLayoutEffect } from "react";
import { Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { io } from "socket.io-client";
import ProfileBox from "./ProfileBox.jsx";
import { useDispatch, useSelector } from 'react-redux';
import Notification from "./Notification_seller.jsx";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    PointElement,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import Style from './Home_seller.module.css';
import Navbar from "./Components/Navbar_seller";
import LoginNav from "./Components/LoginNav";
import Card from "./Components/Card";
import Footer from "./Components/Footer";
import Messaging from "./Messaging_seller.jsx";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
)
const Home_seller = ()=>{
    const [socket,setsocket] = useState();
    const [stat,setstat] = useState();
    const [auth,setAuth]= useState(false);
    const [messageset,setmessagesetter] = useState(false);
    const [salesDatatable, setSalesData] = useState([]);
    const [top_product,settop_product] = useState();
    const [top_product_list,settop_product_list] = useState();
    const [salescount, setSalescount] = useState([]);
    const notification = useSelector(state => state.toggle)
    const [salesData] = useState([
        { no: 1, customerName: 'Customer 1', productName: 'Product A', quantity: 5, price: 10 },
        { no: 2, customerName: 'Customer 2', productName: 'Product B', quantity: 3, price: 15 },
        { no: 3, customerName: 'Customer 2', productName: 'Product B', quantity: 3, price: 15 },
        { no: 4, customerName: 'Customer 2', productName: 'Product B', quantity: 3, price: 15 },
    ]);
    const openmodel = ()=>{
        setAuth(true);
    }
    const closemodel = ()=>{
        setAuth(false);
    }
    const callbackmessage_land = (data)=>{
        console.log("Land ", data);
        setmessagesetter(data);
      }
      const closemessage = ()=>{
        setmessagesetter(false)
      }




    useEffect(()=>{
        setsocket(io("http://localhost:8085"))
    },[])
    useEffect(()=>{
        const id = sessionStorage.getItem("seller_id");
        socket?.emit('addUser',id)
        socket?.on('getUsers',users =>{
        console.log('Buyer_activeUsers:  ',users)
        })
    },[socket])  


    // const sellerId = sessionStorage.getItem("seller_id");

    useEffect(() => {
        const id = sessionStorage.getItem("seller_id");
        // const id = "651c5377783c0719018cd17f";
        console.log(id);
        axios.get(`https://heritage-u8vo.onrender.com/order_seller/${id}`)
          .then((response) => {
            console.log(response.data);
            const mappedData = response.data.map((order, index) => ({
                no: index + 1,
                customerName: order.Buyer?.name,
                productName: order.productName,
                quantity: order.quantity,
                price: order.price,
              }));
            setSalesData(mappedData);
            console.log("Hook :"+salesDatatable);
          })
          .catch((error) => {
            console.error("Error while fetching data:", error);
          });
        
        axios.get(`https://heritage-u8vo.onrender.com/count_customer/${id}`)
        .then((response) => {
            const mappedData = response.data.map((order, index) => ({
                no: index + 1,
                BuyerName: order.buyerName,
                count: order.orderCount
            }));
            console.log(mappedData);
            setSalescount(mappedData);
        })
        .catch((error) => {
            console.error("Error while fetching data:", error);
        });


        axios.get(`https://heritage-u8vo.onrender.com/HomeSeller/top_product_list/${id}`)
        .then((response) => {
            settop_product_list(response.data)
            console.log(response)
        })
        .catch((error) => {
            console.error("Error while fetching data:", error);
        });
      


    }, []);
    useLayoutEffect(()=>{
        const id = sessionStorage.getItem("seller_id");
        axios.get(`https://heritage-u8vo.onrender.com/HomeSeller/stat/${id}`)
        .then((res) => {
          setstat(res.data);
          console.log("A", res.data);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    },[])
    
    const totalPriceByMonthArray = stat?.totalPriceByMonth ? Object.values(stat.totalPriceByMonth) : [];
    const labels = stat?.totalPriceByMonth ? Object.keys(stat.totalPriceByMonth) : [];
    
    const data = {
      labels: labels,
      datasets: [
        {
          data: totalPriceByMonthArray,
          backgroundColor: 'transparent',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 4,
          tension: 0.5
        }
      ]
    };
    
    
    const options = {
        Plugin:{
            legend: true,
            position: "bottom"
        },
        title: {
            text: "Comparison by month",
            display: true,
            fontSize: 10
        }

    }
    useLayoutEffect(()=>{
        const id = sessionStorage.getItem("seller_id");
        axios.get(`https://heritage-u8vo.onrender.com/HomeSeller/top_product/${id}`)
        .then((res) => {
          settop_product(res.data);

        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    },[])
    const pieChartData = {
        labels: top_product? top_product.map(item => item.name) : [],
        datasets: [
            {
                data: top_product? top_product.map(item => item.count) : [],
                backgroundColor: ['#eb9360', '#d9bb6a', '#b359eb', '#e866c1', '#66e87e'],
                borderWidth: 1
            }
        ]
    };
    
    

    return (
        <>
            {/* {sellerId ? <LoginNav /> :<Navbar /> } */}
            <LoginNav callback2 = {callbackmessage_land} />
            {/* <Navbar openmodel={openmodel}/> */}
            {notification.toggle && <Notification/>}
            { auth && <ProfileBox closemodel={closemodel}/> }
            <div className={Style.line}></div>
            <div className={Style.header}>
                <div className={Style.left}>
                    <div className={Style.box}>
                        <div className={Style.first}>
                            <p>Total Customers</p>
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <p>{stat && stat.totalCustomers}</p>
                        <div className={Style.first}>
                            <p>{stat && stat.DayPercentage}%</p>
                            <p>Since last month</p>
                        </div>
                    </div>
                    
                    <div className={Style.box}>
                        <div className={Style.first}>
                            <p>Sales Today</p>
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <p>{stat && stat.dailyIncome}</p>
                        <div className={Style.first}>
                            <p>{stat && stat.DayIncomePercentage}%</p>
                            <p>Since last day</p>
                        </div>
                    </div>

                    <div className={Style.box}>
                        <div className={Style.first}>
                            <p>Monthly Sales</p>
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <p>{stat && stat.monthlyIncome}</p>
                        <div className={Style.first}>
                            <p>{stat && stat.LastMonthIncomePercentage}%</p>
                            <p>Since last month</p>
                        </div>
                    </div>

                    <div className={Style.box}>
                        <div className={Style.first}>
                            <p>Yearly Sales</p>
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <p>{stat && stat.yearlyIncome}</p>
                        <div className={Style.first}>
                            <p>{stat && stat.LastYearIncomePErcentage}%</p>
                            <p>Since last year</p>
                        </div>
                    </div>
                    
                </div>
                <div className={Style.right}>
                    <Line data={data} options={options} className={Style.graph}></Line>

                </div>
            </div>
            <div className={Style.line}></div>
            <div className={Style.middle}>
                <div className={Style.left}>
                    <p>Top Tranding Product</p>
                    <div className={Style.inner}>
                    
                        {top_product_list && top_product_list.map(product => (
                            <Card
                                key={product.name}
                                image={product.pic}
                                productName={product.name}
                                review={`Quantity: ${product.quantity}`}
                                price={`Price: ${product.price}`}
                            />
                        ))}

                    </div>
                </div>
                <div className={Style.right}>
                    <Pie
                        data ={pieChartData}
                        options={options}
                    >
                    </Pie>
                </div>
            </div>
            <div className={Style.line}></div>
            <div className={Style.customer}>
                <div className={Style.orders}>
                    <p>latest orders</p>
                    <div className={Style.table}>

                        <table>
                            <thead>
                                <tr>
                                <th>No</th>
                                <th>Customer Name</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesDatatable.map((sale) => (
                                <tr key={sale.no}>
                                    <td>{sale.no}</td>
                                    <td>{sale.customerName}</td>
                                    <td>{sale.productName}</td>
                                    <td>{sale.quantity}</td>
                                    <td>{sale.price}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
                <div className={Style.topcustomer}>
                    <p>Top Customers</p>
                    <div className={Style.table}>
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Customer Name</th>
                                    <th>No. of Order</th>
                                </tr>
                            </thead>
                            <tbody>
                            {salescount.map((sale, index) => (
                                <tr key={index}>
                                    <td>{sale.no}</td>
                                    <td>{sale.BuyerName}</td>
                                    <td>{sale.count}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {messageset && <Messaging closemessage={closemessage}/>}
            <Footer/>
        </>
    );
}
export default Home_seller;