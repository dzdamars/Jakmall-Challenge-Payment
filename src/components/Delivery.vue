<template>
  <div class="delivery">
    <a href="#" class="delivery__out">
       <i class="fa fa-arrow-left"></i>
       <p>Back to cart</p>
    </a>
    <div class="delivery__grid">

      <div class="delivery__details">
        <h1>Delivery details</h1>

        <div class="delivery__input">
          <div class="group" :class="{valid: valid.nameval, notvalid: notvalid.nameval}">
            <input type="text" required v-model="user.name" @keyup="validate" spellcheck="false">
            <label>Name</label>
            <p v-if="user.name == ''"></p>
          </div>
          <div class="group" :class="{valid: valid.emailval, notvalid: notvalid.emailval}">
            <input type="text" required v-model="user.email" @keyup="validate" spellcheck="false">
            <label>Email</label>
            <p v-if="user.email == ''"></p>
            <p v-if="user.email !='' && valid.emailval==false"></p>
          </div>
          <div class="group" :class="{valid: valid.phoneval, notvalid: notvalid.phoneval}">
            <input type="text" required v-model="user.phone" @keyup="validate" spellcheck="false">
            <label>Phone Number</label>
            <p v-if="user.phone == ''"></p>
            <p v-if="user.phone !='' && valid.phoneval==false"></p>
          </div>
          <div class="text-area" :class="{valid: valid.addressval, notvalid: notvalid.addressval}">
            <textarea spellcheck="false" placeholder="Delivery Address" required v-model="user.address" @keyup="validate"></textarea>
            <p>{{addrcount.used}}/{{addrcount.left}}</p>
            <p v-if="user.address == ''"></p>
            <p v-if="user.address !='' && addrcount.used>120">maksimal 120 karakter</p>
          </div>
          
        </div>

      </div>

      <div class="delivery__dropship">
        <div class="checkbox">
          <label>Send as dropshipper <span @click="isChecked"><div v-if="checked"></div></span></label>
        </div>
        <div class="delivery__input" v-if="checked">
          <div class="group" :class="{valid: valid.droname, notvalid: notvalid.droname}">
            <input type="text" required v-model="user.droname" @keyup="validate" spellcheck="false">
            <label>Dropshipper Name</label>
            <p v-if="user.droname == ''"></p>
          </div>
          <div class="group" :class="{valid: valid.drophone, notvalid: notvalid.drophone}">
            <input type="text" required v-model="user.drophone" @keyup="validate" spellcheck="false">
            <label>Dropshipper Phone Number</label>
            <p v-if="user.drophone == ''"></p>
            <p v-if="user.drophone !='' && valid.drophone==false"></p>
          </div>
        </div>
      </div>

      <div class="delivery__summary">
        <app-summary v-bind:btntitle="btntitle" v-bind:linkto="linkto"></app-summary>
      </div>
    </div>
   
  </div>
</template>

<script>
import summary from './Summary.vue'
export default {
  data(){
    return {
      btntitle: 'Continue to Payment',
      linkto: '/payment',
      show: false
    }
  },
  components: {
    'app-summary': summary,
  },
  computed: {
    checked(){
      return this.$store.state.checked;
    },
    dropFee(){
      return this.$store.state.dropFee;
    },
    cost(){
      return this.$store.state.cost;
    },
    totalcost(){
      return this.$store.state.totalcost;
    },
    user(){
      return this.$store.state.user;
    },
    valid(){
      return this.$store.state.valid;
    },
    notvalid(){
      return this.$store.state.notvalid;
    },
    addrcount(){
      return this.$store.state.addrcount;
    },
    purchased(){
      return this.$store.state.purchased;
    },
    btnlink(){
      return this.$store.state.btnlink;
    },
    isvalid(){
      return this.$store.state.isvalid;
    }
    
  },
  methods: {
    isChecked(){
      this.$store.state.checked = this.$store.state.checked ? false: true
      if(this.checked){
        this.$store.state.dropFee.title = 'Dropshipping Fee';
        this.$store.state.dropFee.cost = 5900
        if(this.user.droname == '' || this.user.drophone == ''){
          this.$store.state.isvalid = ''
        }
        
      }else{
        this.$store.state.dropFee.title = '';
        this.$store.state.dropFee.cost = ''
        this.$store.state.isvalid = 'click'
      }
     
     
      this.$store.state.totalcost = parseInt(this.cost + this.dropFee.cost);
      //console.log(this.$store.state.user.name)
    },
    validate(){
      
      //console.log(this.$store.state)
      //validate user name
      if(this.user.name == ''){
        this.notvalid.nameval = true;
        this.valid.nameval = false;
      }else{
        this.notvalid.nameval = false;
        this.valid.nameval = true;
      }

      //validate user email || !emailIsValid
      const emailRegex = /^[a-z]+((_|\.|-)?[a-z\d]+)*@[a-z\d]+((-)?[a-z\d]+)*\.[a-z]{2,8}(\.[a-z]{2,8})?$/;
      let emailIsValid = emailRegex.test(this.user.email)
      if(this.user.email == '' || !emailIsValid){
        this.notvalid.emailval = true;
        this.valid.emailval= false
      }else{
        this.notvalid.emailval = false;
        this.valid.emailval = true
      }


      //validate user phone || !phoneIsValid
      const phoneRegex = /^(0|\+62|\(\d{3,4}\))[\d\-]{5,19}$/;
      let phoneIsValid = phoneRegex.test(this.user.phone);
      if(this.user.phone == '' || !phoneIsValid){
        this.notvalid.phoneval = true;
        this.valid.phoneval = false;
      }else{
        this.notvalid.phoneval = false;
        this.valid.phoneval = true;
      }

      //validate address this.user.address.length > 120 || 
      if(this.user.address == '' || this.user.address.length > 120){
        this.notvalid.addressval = true;
        this.valid.addressval = false;
      }else{
        this.notvalid.addressval = false;
        this.valid.addressval = true;
      }
      this.addrcount.used = this.user.address.length;

     
      //validate dropship name
      if(this.user.droname == ''){
        this.valid.droname = false;
        this.notvalid.droname = true
      }else{
        this.valid.droname = true;
        this.notvalid.droname = false
      }
      //validate dropship phone || !isValidPhoneDrop
      let isValidPhoneDrop = phoneRegex.test(this.user.drophone);
      if(this.user.drophone =='' || !isValidPhoneDrop){
        this.valid.drophone = false;
        this.notvalid.drophone = true
      }else{
        this.valid.drophone = true;
        this.notvalid.drophone = false
      }

       if(this.user.name == '' || !emailIsValid || !phoneIsValid || this.user.address.length > 120 || this.user.address == ''){
        this.$store.state.isvalid = ''
      }else if(this.checked){
        //console.log(12)
        if(this.user.droname == '' || !isValidPhoneDrop){
          this.$store.state.isvalid = ''
        }else{
          this.$store.state.isvalid = 'click'
        }
      }else if(this.checked == false){
        this.$store.state.isvalid = 'click'
      }
    },
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
    font-family:Arial;
  }
  .fa{
    font-size: 13px;
    margin-right: 10px;
    @include if-lessThan-768px{
        font-size: 12px;
      }
  }
  .delivery{
    padding: 40px;
    height: 100%;
    @include if-lessThan-768px{
      padding: 25px;
    }
    .delivery__out{
      display: flex;
      align-items: center;
      color: #656567;
      @include if-lessThan-768px{
        font-size: 12px;
      }
    }
    .delivery__grid{
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
      .delivery__details{
        h1{
          padding-bottom: -5px;
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
      }
      .delivery__dropship{
        .checkbox{
          display: flex;
          padding: 7px;
          align-items: center;
          justify-content: flex-end;
          color: #656567;
          @include if-lessThan-768px{
            font-size: 15px;
          }
          :checked > div{
            display: block;
          }
         label{
           position: relative;
            span{
              position: absolute;
              width: 18px;
              height: 18px;
              border: 2px solid #43e194;
              top: 0;
              left: -25px;
              cursor: pointer;
              div{
                position: absolute;
                left: 4px;
                content: ' ';
                top: 1px;
                width: 6px;
                height: 10px;
                border: solid #43e194;
                border-width: 0 2px 2px 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
              }
            }
         }
        }
      }
      .delivery__summary{
        height: 100%;
        border-left: 2px solid #fff3e5;
        padding-left: 20px;
      }
    }
    .delivery__input{
      margin-top: 25px;
      width: 100%;
      .group{
        width: 100%;
        height: 60px;
        margin-bottom: 15px;
        border: 1px solid #b8b7ba;
        padding: 10px;
        position: relative;
        p{
          font-size: 12px;
          margin-top: -10px;
        }
        input{
          padding:15px 10px 7px 0px;
          width: 100%;
          border: none;
          font-weight: 500;
          font-size: 14px;
          &:focus{
             outline: none;
          }
          &:focus ~ label, &:valid ~ label {
            font-size: 12px;
            top: 5px;
          }
        }
        label{
          position: absolute;
          pointer-events: none;
          top: 20px;
          left: 10px;
          color: #999;
          font-size: 13px;
          transition: all 0.4s ease;
        }
      }
      
     
      .text-area{
        width: 100%; 
        height: 130px;
        border: 1px solid #b8b7ba;
        position: relative;
        textarea{
          font-size: 15px;
          padding: 10px 20px 10px 10px;
          width: 100%;
          height: 100%;
          border: none;
          resize: none;
          outline: none;
          &::focus{
            outline: none;
          }
          &::placeholder{
            color: #999;
            font-size: 15px;
          }
        }
        p{
          color: #000;
          position: absolute;
          bottom: 5px;
          right: 8px;
          font-size: 12px;
          &:nth-child(odd){
            left: 10px;
          }
        }
      }

      .valid{
        border: 2px solid #7feab5;
        position: relative;
        &::after{
          font-weight:bolder;
          content: ' ';
          position: absolute;
          top: 25px;
          right: 10px;
          width: 10px;
          height: 5px;
          border-left: 2px solid #25df8b;
          border-bottom: 2px solid #25df8b;
          transform: rotate(-45deg);
        }
        label{
          color: #25df8b;
        }
      }
      .notvalid{
        border: 2px solid #e07b04;
        position: relative;
        &::after{
          content: 'x';
          position: absolute;
          top: 18px;
          right: 10px;
          width: 10px;
          height: 10px;
          color: #e07b04;
          font-weight:bolder;
        }
        label{
          color: #e07b04;
          font-size:13px;
        }
      }
      
     
    }
  }
</style>