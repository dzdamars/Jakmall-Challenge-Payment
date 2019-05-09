import Delivery from './components/Delivery.vue'
import Payment from './components/Payment.vue'
import Finish from './components/Finish.vue'
export default [
    {path: '/', component: Delivery },
    {path: '/payment', component: Payment},
    {path: '/finish', component: Finish}
]