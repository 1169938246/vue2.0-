<template>
	
	<div class="ratings" ref="ratings">
			
		<div class="ratings-content">
			<splice></splice>
		   <div class="ratings-over">
		      <div class="ratings-left">
		      <h1 class="score">{{seller.score}}</h1>
		      <div class="ratings-title">综合评分</div>
		      <div class="rank">高于周围商家{{seller.rankRate}}%</div>
		      </div>
		   <div class="rathing-rgiht">
		   	<div class="ratings-wapper">
		   		<span class="ratings-head">服务态度</span>
		   		  <span><star :size="24" :score="seller.foodScore"></star></span>
		   		  <span class="ratings-score">{{seller.foodScore}}</span>
		   	</div>
		   		<div class="ratings-wapper">
		   		<span class="ratings-head">口味</span>
		   		  <span><star :size="24" :score="seller.foodScore"></star></span>
		   		  <span class="ratings-score">{{seller.serviceScore}}</span>
		   	</div>
		   		<div class="ratings-wapper">
		   		<span class="ratings-head">包装</span>
		   		  <span><star :size="24" :score="seller.foodScore"></star></span>
		   		  <span class="ratings-score">{{seller.deliveryPrice}}</span>
		   	</div>
		   </div>
		   </div>
		   <div style="clear: both;"></div>
			<splice ></splice>
	  <rathingselect ></rathingselect>
	 <div class="food-waring">
					<ul  style="padding-left: 0;">						
						<li v-for="rating in ratings" class="rating-item">
							<div class="user">
								<span class="user-name">{{rating.username}}</span>
								<img width="12"height="12" class="avatar" :src="rating.avatar">
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
							<p class="status-text">
<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}" class="stasus-icon"></span>
                         {{rating.text}}

							</p>
						</li>
					</ul>
					
				</div>
		</div>
		</div>
		
	
	
</template>

<script>
	 import BScroll from 'better-scroll';
	 import star from '../star/star';
	  import splice from '../splice/splice';
	   import {formatDate} from '../../common/js/date.js';
	 import rathingselect from '../rathingselect/rathingselect';
	 const ALL = 2;
  const ERR_OK = 0;
	 export default{
	 	  props:{
	 	  	seller:{
	 	  		type:Object
	 	  	},
	 	  	food:{
	 	  		type:Object
	 	  	}
	 	  },
	 	    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      };
    },
	 	   methods: {
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
	 	components:{
	 		rathingselect,
	 		splice,
	 		star
	 	},
	 	created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
    },
	 	
	 }
	 
	 
</script>

<style>
	ul li{
		list-style-type: none;
	}
	.ratings{
		position: absolute;
		top: 174px;
		left:0;
		bottom: 0;
		background:white;
		width: 100%;
		overflow: hidden;
	}
	.ratings-left{
		float: left;
		width: 40%;
		height: auto;
		overflow: hidden;
		text-align: center;
		border-right: 1px solid rgba(204, 204, 204, 0.26);
		padding: 10px;
		margin-top: 10px;
		
	}
	
	.rathing-rgiht{
		float: left;
		width: 60%;
		height: auto;
		overflow: hidden;
		
		
	}
	.score{
		color: #f3ba6a;
	}
	.ratings-title{
	   line-break: 20px;
	   font-weight: bold;
	  font-size:20px;
	  padding-bottom: 10px;
	}
	.rank{
		font-size: 14px;
		color: #9d9aad;
		
	}
	.ratings-head{
		font-size: 14px;
		
	}
	.ratings-wapper{
		width: 100%;
		overflow: hidden;
		height: auto;
		padding: 10px;
		
	}
	.ratings-wapper span{
	display: inline-block;
	margin-top: 5px;
	font-size: 12px;

	
		
		
	}
	.ratings-score{
		
		color: #9d9aad;
	}
	.food-waring{
  	padding: 0 18px;
  }
  .rating-item{
  	padding: 16px 0;
  	position: relative;
  	border-bottom: 1px solid #CCCCCC;
  }
  .user-name{
  	font-size: 12px;
  	 color: rgb(147, 153, 159)
  }
  .status-text{
  	font-size: 12px;
  	line-height: 16px;
  	color: rgb(7, 17, 27);
  	vertical-align:middle;
  }
   .icon-thumb_up{
   	  color: rgb(0, 160, 220);
   	 
   }
            
            .icon-thumb_down{
            	 color: rgb(147, 153, 159)
            }
     .stasus-icon{
     	font-size: 18px;
     	vertical-align: middle;
     	margin-right: 4px;
     	line-height: 16px;
     
     }
        .time{
        	margin-bottom: 6px;
        	line-height: 12px;
        	font-size: 10px;
        	color: rgb(147,153,159);
        }   
        .food-span{
        	font-size: 12px;
        	float: right;
        	margin-right: 10px;
        		
        }  
         .food-info{
  	padding: 18px;
  	font-size: 12px;
  	color:#4d555d;
  }
  .food-title{
  padding-left: 10px;
  padding-top: 10px;
  font-size: 14px;
  color: #2B333B;
  	
  }
  .user{
  	display: inline-block;
  	float: right;
  }
  .avatar{
  	border-radius: 50%;
  }
	
</style>