import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as p,i as S}from"./assets/vendor-A92OCY9B.js";document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector("[data-start]");e.disabled=!0});const o=document.getElementById("datetime-picker"),n=document.querySelector("[data-start]"),b=document.querySelector("[data-days]"),g=document.querySelector("[data-hours]"),k=document.querySelector("[data-minutes]"),D=document.querySelector("[data-seconds]");let u=null,l=null;const E={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,clickOpens:!0,allowInput:!1,locale:{firstDayOfWeek:1,weekdays:{shorthand:["Su","Mo","Tu","We","Th","Fr","Sa"],longhand:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]}},onClose(e){const t=e[0];t>new Date?(u=t,n.disabled=!1):(S.error({message:"Please choose a date in the future",position:"topRight"}),n.disabled=!0)}};p(o,E);n.addEventListener("click",()=>{u&&(n.disabled=!0,o.disabled=!0,l=setInterval(()=>{const e=u-new Date;if(e<=0){clearInterval(l),i(0,0,0,0),o.disabled=!1,n.disabled=!0;return}const{days:t,hours:a,minutes:s,seconds:c}=d(e);i(t,a,s,c)},1e3))});function d(e){const m=Math.floor(e/864e5),f=Math.floor(e%864e5/36e5),y=Math.floor(e%864e5%36e5/6e4),h=Math.floor(e%864e5%36e5%6e4/1e3);return{days:m,hours:f,minutes:y,seconds:h}}console.log(d(2e3));console.log(d(14e4));console.log(d(2414e4));function r(e){return String(e).padStart(2,"0")}function i(e,t,a,s){b.textContent=r(e),g.textContent=r(t),k.textContent=r(a),D.textContent=r(s)}o.setAttribute("autocomplete","off");o.addEventListener("focus",()=>{o._flatpickr.open()});
//# sourceMappingURL=1-timer.js.map
