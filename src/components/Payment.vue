<template>
    <div class="payment">
       <router-link to="/" class="payment__out" @click.native="changelink">
            <i class="fa fa-arrow-left"></i>
            <p>Back to delivery</p>
       </router-link>
       <div class="payment__grid">
           <div class="payment__details">
               <h1>Shipment</h1>
               <div class="payment__service">
                   <div class="payment__courier" @click="activate(1)" :class="{active: active_el == 1}">
                    <div>
                       <p>GO-SEND</p>
                       <P style="margin-right:90px;">{{this.$store.state.courierprices[0].toLocaleString()}}</P>
                    </div>
                   </div>
                   <div class="payment__courier"  @click="activate(2)" :class="{active: active_el == 2}">
                    <div>
                       <p>JNE</p>
                       <P style="margin-right:93px;">{{this.$store.state.courierprices[1].toLocaleString()}}</P>
                    </div>
                   </div>
                   <div class="payment__courier"  @click="activate(3)" :class="{active: active_el == 3}">
                    <div>
                       <p style="margin-right:20px;">Personal Courier</p>
                       <P>{{this.$store.state.courierprices[2].toLocaleString()}}</P>
                    </div>
                   </div>
               </div>
               <h1>Payment</h1>
               <div class="shipment__service">
                   <div class="shipment__courier" @click="payfunc(1)" :class="{activepay: active_ship == 1}">
                       <div>
                         <p>e-wallet</p>
                         <p style="margin-right: 45px;">{{ewalletsaldo.toLocaleString()}} left</p>
                       </div>
                   </div>
                   <div class="shipment__courier" @click="payfunc(2)" :class="{activepay: active_ship == 2}">
                       <div><p style="margin-right:40px;">Bank Transfer</p></div>
                   </div>
                   <div class="shipment__courier" @click="payfunc(3)" :class="{activepay: active_ship == 3}">
                       <div><p style="margin-right:30px;">Virtual Account</p></div>
                   </div>
               </div>
           </div>
           <div class="payment__summary">
               <app-summary v-bind:btntitle="btntitle" v-bind:estimation="estimation" v-bind:linkto="linkto"></app-summary>
           </div>
       </div>
    </div>
</template>

<script>
import summary from './Summary.vue'
export default {
    components: {
        'app-summary': summary
    },
    data(){
        return {
           active_el: 1,
           active_ship: 1,
           btntitle:  'Pay with e-Wallet',
           changebtn: ['Pay with e-Wallet', 'Pay with Bank Transfer', 'Pay with Virtual Account'],
           estimation: 'Delivery estimation',
           totalall: this.$store.state.totalcost,
           linkto: '/finish'
        }
    },
    computed: {
        ewalletsaldo(){
          return this.$store.state.ewalletsaldo
        }
    },
    methods: {
        activate(el){
            this.active_el = el;
            this.$store.state.estimate = this.$store.state.dayestimate[el-1];
            this.$store.state.courierchose = this.$store.state.courier[el-1];
            this.$store.state.pricechose = this.$store.state.courierprices[el-1];
           
        },
        payfunc(el){
            this.active_ship = el;
            this.btntitle = this.changebtn[el-1]
            this.$store.state.payment = this.$store.state.paymethod[el-1]
        },
        changelink(){
            //console.log(this.$store.state.linkto = '/payment')
            this.$store.state.estimate = '';
            this.$store.state.courierchose = '';
            this.$store.state.by = ''
            this.$store.state.shipment = ''
            this.$store.state.totalcost -= this.$store.state.pricechose
            this.$store.state.pricechose = ''
            
            this.$store.state.linkto = '/payment';
            this.$store.state.btnlink = 'Continue to payment';
        },
    },
    beforeUpdate(){
      this.$store.state.totalcost = this.totalall + this.$store.state.pricechose
    },
    mounted(){
       this.$store.state.pricechose = 15000
       this.$store.state.totalcost = this.totalall + this.$store.state.pricechose
       this.$store.state.courierchose = 'GO-SEND'
       this.$store.state.by = 'by'
       this.$store.state.shipment = 'shipment'
       this.$store.state.payment = 'e-Wallet'
    }
    
    
}
</script>

<style scoped lang="scss">
@mixin if-lessThan-768px{
		@media (max-width: 768px){
			@content;
		}
	}
    body {
        font-family: Arial;
    }
    .payment{
        padding: 40px;
        height: 100%;
        @include if-lessThan-768px{
            padding: 25px;
        }
        .fa{
            font-size: 13px;
            margin-right: 10px;
             @include if-lessThan-768px{
                font-size: 12px;
            }
        }
        .payment__out{
            display: flex;
            align-items: center;
            color: #656567;
             @include if-lessThan-768px{
                font-size: 12px;
            }
        }
        .payment__grid{
            display: grid;
            height: 65vh;
            grid-template-columns: 3fr 2fr 2fr;
            grid-gap: 25px;
            margin-top: 20px;
            @include if-lessThan-768px{
                grid-template-columns: 1fr;
                grid-gap: 5px;
                height: 100%;
            }
            .payment__details{
              grid-column: 1/3;
                h1{
                    padding-bottom: -5px;
                    margin-bottom: 25px;
                    font-weight: bold;
                    color: #ff8a00;
                    font-size: 27px;
                    position: relative;
                    z-index: 1;
                    @include if-lessThan-768px{
                        font-size: 20px;
                    }
                    &::after{
                        position: absolute;
                        content: ' ';
                        width: 8em;
                        height: 7px;
                        background: #e9e9ec;
                        left: 0;
                        z-index: -1;
                        bottom: 2px;
                    }
                }
                .payment__service{
                    width: 85%;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 20px;
                    margin-bottom: 65px;
                     @include if-lessThan-768px{
                        width: 100%;
                         grid-gap: 5px;
                    }
                    .payment__courier{
                        height: 55px;
                        display: grid;
                        align-items: center;
                        justify-items: center;
                        border: 2px solid #cecccc;
                        cursor: pointer;
                        position: relative;
                        p{
                            font-size: 13px;
                            line-height:1.6;
                            @include if-lessThan-768px{
                               font-size: 10px;
                            }
                            
                        }
                    }
                     .active{
                        border: 2px solid #7eeab4;
                        background: #e5fce9;
                        &::after{
                          position: absolute;
                          content: ' ';
                          width: 10px;
                          height: 5px;
                          border-left: 2px solid #7eeab4;
                          border-bottom: 2px solid #7eeab4;
                          right: 10px;
                          top: 8px;
                          transform: rotate(-45deg);
                        }
                    }
                }
                .shipment__service{
                    @extend .payment__service;
                    .shipment__courier{
                        @extend .payment__courier
                    }
                    .activepay{
                        @extend .active;
                    }
                }
            }
            .payment__summary{
              height: 100%;
               border-left: 2px solid #fff3e5;
               padding-left: 20px;
            }
        }
    }
</style>
