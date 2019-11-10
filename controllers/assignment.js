const Assignment = require('../models/assignment')
// const status = require('http-status');
const { errorHandler } = require('../tools/helpers')

const assignmentController = {
    create : async (req,res) =>{
        try {
            const newAssignment = new Assignment(req.body)
            await newAssignment.save()
            res.send(newAssignment)           
        } catch (e){
            errorHandler(e, res)
        }
    },

    update: async (req,res) =>{
        const {id} = req.params
        const assignment = await Assignment.findByIdAndUpdate(id, req.body, { new: true });
        res.send(assignment)
    }
}

module.exports = assignmentController