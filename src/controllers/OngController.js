const crypto = require('crypto');// importando funcao de criptografia do node para gerar um id da ong
const connection = require('../database/connection');//importando conexao com banco

module.exports = {
//-----------------lista ongs cadastradas----------------------------
    async index (request,response){
           const ongs = await connection('ongs').select('*');
         
            return response.json(ongs);
        },
//------------------------Cria Ongs no banco--------------------------------------------
    async create( request,response){
        const {name, email, whatsapp, city, uf} = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
    
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })
        return response.json({id});// devolve e mostra o id que foi gerado no cadastro da ong
    }
};