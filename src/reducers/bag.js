import {
    ADD_TO_BAG,
    REMOVE_FROM_BAG,
    EMPTY_BAG,
    SET_QUANTITY,
    SET_SIZE,
} from '../actions/bag';

const defaultBagState = [];

const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const initiatePayment = async (amount) => {
    const res = await loadRazorpay();
    
    if (!res) {
        alert('Razorpay SDK failed to load');
        return;
    }

    const options = {
        key: "rzp_test_olUFCAfKNLr1gI", // Replace with your Razorpay Key ID
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'Your Store Name',
        description: 'Purchase Description',
        handler: function (response) {
            // Handle successful payment
            alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
            // Clear the bag after successful payment
            return [];
        },
        prefill: {
            name: '',
            email: '',
            contact: ''
        },
        theme: {
            color: '#3399cc'
        }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
};

export default function bag(state = defaultBagState, action) {
    switch (action.type) {
        case ADD_TO_BAG:
            var alreadyPresent = false;
            state.map(item => {
                if(item.id == action.item.id){
                    alreadyPresent = true;
                }
            })
            console.log(alreadyPresent);
            if(!alreadyPresent){
                return [...state, action.item];
            }
            return [...state];
        case REMOVE_FROM_BAG:
            return state.filter(item => item.id !== action.item.id);
        case EMPTY_BAG:
            // Calculate total amount
            const totalAmount = state.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);
            
            // Initiate Razorpay payment
            initiatePayment(totalAmount);
            return state; // Don't empty the bag until payment is successful
        case SET_QUANTITY:
            return state.map(item => {
                if (item.id === action.item.id) {
                    return {
                        ...item,
                        quantity: action.quantity
                    }
                }
                return item;
            });
        case SET_SIZE:
            return state.map(item => {
                if (item.id === action.item.id) {
                    return {
                        ...item,
                        size: action.size
                    }
                }
                return item;
            });
        default:
            return state;
    }
}
