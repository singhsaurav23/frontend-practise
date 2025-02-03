import { useState, createContext, useContext } from 'react'

interface Product {
    name: string,
    description: string,
    price: string
    qty: number
}

const Products: Product[] = [
    {
        name: "Football",
        description: "play",
        price: "100",
       qty:1,
    },
    {
        name: "Cricketset",
        description: "play",
        price: "1000",
        qty:1
        
    },
]
// Properly typed context
const CartContext = createContext(null);

export const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext);
    return (
        <div>
            {
                cart.map((product, index) => (
                    <div key={index} className='p-3'>
                        {product.name}
                        {product.description}
                        {product.price}
                        {product.qty}
                        <button onClick={() => removeFromCart(product)}>Remove</button>
                    </div>
                ))
            }
        </div>
    )

}

export const Productss = () => {
    const {  addtoCart } = useContext(CartContext);

    return(
        <div>
            {
                Products.map((product,index) => (
                    <div key={index} className='p-3'>  
                        {product.name}
                        {product.description}
                        {product.price}
                        
                        <button onClick={() => addtoCart(product)}>Add</button>
                    </div>
                ))
            }
        </div>
    )

}

const CartProvider = ({ children }: { children: React.ReactNode }) => {

    const [cart, setCart] = useState<Product[]>([]);

    const addtoCart = (product: Product) => {

        setCart((prev) => {
            const item = prev.find((cartItem) => cartItem.name === product.name);
            if (item) {
                return prev.map((prod) => {
                    if (prod.name === product.name) {
                        return { ...prod, qty: prod.qty + 1 }
                    } else return prod;
                })
            }
            product.qty = 1;
            return [...prev, product];
        })

    };



    const removeFromCart = (product: Product) => {
        setCart((prev) => {
            return prev.map((item) => {
                if (item.name === product.name) {
                    return { ...item, qty: item.qty - 1 };
                } else return item;
            }).filter((item) => item.qty > 0);
        })
    }

    return (
        <CartContext.Provider value={{ cart, addtoCart, removeFromCart }}>
            {children }
        </CartContext.Provider>
    )
}

function App() {
    
    return (

        <CartProvider>
        <Productss />
        <Cart/>
        </CartProvider>
  )
}

export default App



// Define the Notification interface
interface Notification {
    id: number;
    message: string;
    type: 'success' | 'error';
}

import { useCallback } from "react";
import { atom, useRecoilState, RecoilRoot, useRecoilValue } from "recoil";

// Create a unique atom key
const notificationsAtom = atom<Notification[]>({
    key: "notifications-unique-key", // Use a more unique key
    default: [],
});

const Notification = ({ id, message, type }) => {

    return (
        <div className={`px-4 py-2 ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white rounded mb-2`}>
            {message}
        </div>
    );
};

const NotificationList = () => {
    const [notifications, setNotifications] = useRecoilState(notificationsAtom);
   
    return (
        <div className="absolute top-4 right-4">
            {notifications.map((n) => (
                <div key={n.id}>
                 <Notification  {...n} />
                </div>
               
            ))}
        </div>
    );
};

const NotifDemo = () => {
    const [notifications, setNotifications] = useRecoilState(notificationsAtom);

    const addNotification = useCallback((message: string, type: 'success' | 'error') => {
        const newNotification: Notification = {
            id: Date.now(),
            message,
            type
        };

        setNotifications(prev => [...prev, newNotification]);

       

        // Optional: Auto-remove after 5 seconds
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
        }, 5000);
    }, [setNotifications]);
   
    return (
        <div>
            <div className="p-4">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                    onClick={() => addNotification("Success Message!", "success")}
                >
                    Show Success
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => addNotification("Error Occurred!", "error")}
                >
                    Show Error
                </button>
            </div>
            <NotificationList />
        </div>
           
    );
};

const App = () => {
   

    return (
        <RecoilRoot>
            <NotifDemo/>
        </RecoilRoot>
    );
};

export default App;


