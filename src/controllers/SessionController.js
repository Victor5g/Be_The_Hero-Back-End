const connection = require('../database/connection');

module.exports= {
    async create(request,response){
        const { id } = request.body;//Pega o ID do corpo da requisicao
        
        const ong = await connection('ongs')
        .where('id',id)
        .select('name')
        .first(); // retorna a ong o .firts() retorna apenas um resultado

        if(!ong){
            return response.status(400).json({Error:'Ong no exist'});
        }
        return response.json(ong);
    }

};