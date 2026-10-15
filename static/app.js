'use strict';
const prefix='profile-demo:';
const $=s=>document.querySelector(s);
function read(key,fallback){try{return JSON.parse(localStorage.getItem(prefix+key))??fallback}catch{return fallback}}
function write(key,value){try{localStorage.setItem(prefix+key,JSON.stringify(value));return true}catch{toast('Browser storage unavailable. Changes cannot be saved.');return false}}
let timer;
function toast(message){const el=$('#toast');el.textContent=message;el.hidden=false;clearTimeout(timer);timer=setTimeout(()=>el.hidden=true,4500)}
const profile=read('profile',{});
if($('#profile-name'))$('#profile-name').textContent=profile.name||'John Doe';
const savedAvatar=read('avatar',null);
if($('#avatar')&&typeof savedAvatar==='string'&&/^data:image\/(png|jpeg|webp);base64,/.test(savedAvatar))$('#avatar').src=savedAvatar;
$('#avatar-file')?.addEventListener('change',event=>{const file=event.target.files[0];if(!file)return;if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>1500000){toast('Choose a PNG, JPEG or WebP smaller than 1.5 MB.');return}const reader=new FileReader();reader.onload=()=>{if(write('avatar',reader.result)){$('#avatar').src=reader.result;toast('Profile photo saved.')}};reader.readAsDataURL(file)});
const form=$('#profile-form');
if(form){for(const key of ['name','phone','email','dob'])if(typeof profile[key]==='string')form.elements[key].value=profile[key];form.elements.dob.max=new Date().toLocaleDateString('en-CA');form.addEventListener('submit',event=>{event.preventDefault();const values=Object.fromEntries(new FormData(form));values.name=values.name.trim();if(!values.name){toast('Enter your full name.');return}if(write('profile',values))toast('Profile updated successfully.');})}
const preferences=read('notifications',{});
document.querySelectorAll('.switch input').forEach(input=>{if(typeof preferences[input.dataset.key]==='boolean')input.checked=preferences[input.dataset.key];input.addEventListener('change',()=>{preferences[input.dataset.key]=input.checked;write('notifications',preferences)})});
document.querySelectorAll('.reveal').forEach(button=>button.addEventListener('click',()=>{const input=button.previousElementSibling;input.type=input.type==='password'?'text':'password';button.setAttribute('aria-label',(input.type==='password'?'Show':'Hide')+' password')}));
$('#password-form')?.addEventListener('submit',event=>{event.preventDefault();const form=event.target;if(form.elements.new.value!==form.elements.confirm.value){toast('New passwords do not match.');return}if(form.elements.new.value===form.elements.current.value){toast('Choose a different new password.');return}toast('Demo validation passed. No real password was changed.');form.reset()});
$('#forgot')?.addEventListener('click',()=>toast('Password reset requires an authentication service.'));
let category='all';
function filter(){const query=($('#search')?.value||'').toLowerCase();let count=0;document.querySelectorAll('.faq').forEach(item=>{item.hidden=!(item.textContent.toLowerCase().includes(query)&&(category==='all'||item.dataset.category===category));if(!item.hidden)count++});if($('#no-results'))$('#no-results').hidden=count>0;document.querySelectorAll('.contact').forEach(item=>item.hidden=!item.textContent.toLowerCase().includes(query))}
$('#search')?.addEventListener('input',filter);
document.querySelectorAll('[data-topic]').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.topic;document.querySelectorAll('[data-topic]').forEach(b=>b.classList.toggle('active',b===button));filter()}));
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();toast('This section is outside the supplied screen designs.')}));
$('#delete-open')?.addEventListener('click',()=>$('#delete-dialog').showModal());
$('#delete-cancel')?.addEventListener('click',()=>$('#delete-dialog').close());
$('#delete-confirm')?.addEventListener('click',()=>{try{for(const key of ['profile','notifications','avatar'])localStorage.removeItem(prefix+key);window.location.href='/welcome'}catch{toast('Could not clear browser storage.')}});
