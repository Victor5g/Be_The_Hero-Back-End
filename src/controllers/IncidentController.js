const connection = require('../database/connection');

module.exports = {

async list(request, response){
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+(Esquema de paginacao(Exemplo: Mostra 5 incidentes em uma pagina e + 5 em outra pagina)
    const {page = 1} = request.query;
    const [count] = await connection('incidents').count();//------Contar a quantidade de casos no banco

    const incidents = await connection('incidents')
    .join('ongs','ongs.id','=','incidents.ong_id')// --------------trazer os dado das duas tabelas
    .select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf']) // Selecionando os campos
    .offset((page - 1)*5)//---------------------------------------Usado par pular os registros de 5 em 5 em cada pagina
    .limit(5);//--------------------------------------------------limitando a quantiade de registro

    response.header('X-Total-Count',count['count(*)']);//---------Acessa a quantidade do registro
    return response.json(incidents);//----------------------------retorna a quantidade de registros no header
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
},
    async create(request, response){
        const { title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },


async delete(request, response){
    const {id} = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
    .where('id',id)
    .select('ong_id')
    .first();

    if (incident.ong_id != ong_id){

        return response.status(401).json( {error:'Operation not permited. '});
    }
    await connection('incidents').where('id',id).delete();

    return response.status(204).send();
 }
};