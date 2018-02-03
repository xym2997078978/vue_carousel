<template>
    <div @mouseover='mouseOver' @mouseout='mouseOut'>
        <ul>
            <li v-for='(val,index) in data'><img :src='val.img'></li>
        </ul>
        <span id="left" @click='lClick'><</span>
        <span id="right" @click='rClick'>></span>
    </div>
</template>

<script>
import axios from "axios"
    export default {
        name:'app',
        data() {
            return {
                count:0,
                timer:null,
                data:null
            }
        },
        mounted(){
            this.auto();
            this.getJson();
        },
        methods:{
            getJson(){
                axios.get('http://localhost:3000/data').then(res=>{
                    this.data=res.data;
                })
            },
            rClick(){
                //clearInterval(this.timer);
                let uls=document.getElementsByTagName('ul')[0];
                let lis=document.getElementsByTagName('ul')[0].getElementsByTagName('li');
                let len=lis.length;
                 
                this.count++;
                if(this.count==len){
                    this.count=0;
                }
                uls.style.left=-this.count*lis[0].offsetWidth+'px';
            },
            lClick(){
                //clearInterval(this.timer);
                let uls=document.getElementsByTagName('ul')[0];
                let lis=document.getElementsByTagName('ul')[0].getElementsByTagName('li');
                let len=lis.length;
                
                this.count--;
                if(this.count==-1){
                    this.count=len-1;
                }
                uls.style.left=-this.count*lis[0].offsetWidth+'px';
            },
            auto(){
                let uls=document.getElementsByTagName('ul')[0];
                let lis=document.getElementsByTagName('ul')[0].getElementsByTagName('li');
                let len=lis.length;
                
                this.timer=setInterval(()=>{
                   this.rClick();
                },1000)
            },
            mouseOver(){
                clearInterval(this.timer);
            },
            mouseOut(){
                this.auto();
            }
        }
    }
</script>

<style>
    *{
        padding: 0;
        margin: 0;
        list-style: none;
    }
    #app div{
        width:800px;
        height: 500px;
        border:2px solid #ccc;
        margin:50px auto;
        position: relative;
        overflow: hidden;
    }
    ul{
        width: 6400px;
        height: 500px;
        position: absolute;
        left: 0;
        top: 0;
        transition:left 1s;
    }
    ul>li{
        float: left;
    }
    ul>li img{
        width:800px;
        height: 500px; 
    }
    #left{
        width: 40px;
        height: 60px;
        background: rgba(0,0,0,.3);
        position: absolute;
        left: 10px;
        top: 42%;
        text-align: center;
        line-height: 60px;
        color: #fff;
        font-size: 30px;
    }
    #right{
        width: 40px;
        height: 60px;
        background: rgba(0,0,0,.3);
        position: absolute;
        right: 10px;
        top: 42%;
        text-align: center;
        line-height: 60px;
        color: #fff;
        font-size: 30px;
    }
</style>