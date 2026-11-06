    const express = require("express")
    const router =express.Router()
    const db = require("..db/")
  


    router.get ("/cursos", async (req,res) => {

        const [cursos]= await db.execute("SELECT * FROM curso")
        return res.json (cursos)
    })

    router.post("/cursos", async(req,res) => {
        const {nome,descricao,professorId} =req.body
        if(!nome|| !descricao || !professorId) {

            return res.status(400).json({error:"nome,descricao, professorId são obrigatórios"})
        }



        const [resultado]= await db.execute(

            "INSERT INTO curso(nome,descricao,professor_id) VALUES (?,?,?)",
            [nome,descricao,professorId] 
        )

        return res.status (201).json({id:resultado.insertId,nome,descricao})


    })

    router.delete("/cursos/:id", async (req,res) =>{
const id = req.params.id // pega o id da url


const [resultado] = await db.execute (
    "DELETE FROM curso WHERE id=?",
    [id]
)

if(resultado.affectedRows === 0){

    return res.status(404).json({error:"Curso não encontrado"})
} 

    return res.status(204).end()
    })

    module.exports = router