const member = require('../../Members')
const express = require('express');
const uuid = require('uuid')
const router = express.Router()


router.get('/:id', (req,res)=>{
    const response =  member.some(member => member.id === parseInt(req.params.id))
    response ? res.json(member.filter(member => member.id === parseInt(req.params.id))) :
     res.status(400).json({mes: `Member with the id ${req.params.id} not found`})
     
 })

 router.post('/', (req,res)=>{
     const user = {
         "id" : uuid.v4(),
         "name": req.body.name,
         "email" : req.body.email,
         "status" : "active"
     }
     if(!user.email || !user.name){
         return res.status(400).json({msg: "Please enter name and email"})
     }
     member.push(user)
     res.json(member);
 })

 router.get('/', (req,res)=>{
     res.json(member)
 })


 router.put('/:id', (req,res)=>{
    const response =  member.some(member => member.id === parseInt(req.params.id))
    if(response){
        const updMember = req.body;
        member.forEach(mem =>{
            if(mem.id === parseInt(req.params.id)){
                mem.name = updMember.name ? updMember.name : mem.name,
                mem.email = updMember.email ? updMember.email : mem.email

            }
            res.json({msg: 'member updated', member})
        })
    }
 })

 //delete
 router.delete('/:id', (req,res)=>{
     const found = member.some(member => member.id === parseInt(req.params.id))
     if(found) {
         res.json({mes: "member deleted", member: (member.filter(member => member.id !== parseInt(req.params.id))) })
     }
     else{
         res.status(400).json({error: `no member with the id ${req.params.id}` })
     }
 })

 module.exports = router;
 