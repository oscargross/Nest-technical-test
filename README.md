## Teste Técnico Backend NodeJs Pleno


## Parte 1:

Qual framework é usado para construir aplicações Node.js com arquitetura em microsserviços nativa no seu Core. Ou seja, já nasceu para trabalhar com Microsserviços?<br/>
        a) Express.js <br/>
        b) NestJS <br/>
        c) Koa.js <br/>
---->   **d) LoopBack** <br/>
<br/>

Qual serviço da AWS é usado para armazenar objetos de forma escalável e durável? <br/>
---->   **a) AWS S3** <br/>
        b) AWS EC2 <br/>
        c) AWS RDS <br/>
        d) AWS Lambda <br/>
<br/>

O que significa CI/CD?<br/>
        a) Continuous Improvement/Continuous Deployment <br/>
        b) Centralized Integration/Continuous Deployment <br/>
---->   **c) Continuous Integration/Continuous Deployment** <br/>
        d) Continuous Integration/Centralized Deployment <br/>
<br/>

Qual é a principal função do Keycloak em uma aplicação? <br/>
        a) Serviço de armazenamento de arquivos <br/> 
---->   **b) Gerenciamento de autenticação e autorização** <br/>
        c) Orquestração de containers <br/>
        d) Monitoramento de logs <br/>
<br/>

Qual módulo do Node.js é amplamente utilizado para criar um servidor web e manipular solicitações e respostas para alguma API? <br/>
        a) fs <br/>
---->  **b) http** <br/>
        c) path <br/>
        d) os <br/>
<br/><br/>

## Parte 2:

Pergunta 1: Configuração do Banco de Dados com TypeORM
Considere uma aplicação NestJS usando TypeORM e PostgreSQL. Você precisa configurar a conexão com
o banco de dados. Escreva o trecho de código necessário no arquivo database.module.ts para configurar
a conexão com o banco de dados usando TypeORM.



```bash
# Basicamente foi a conexão realizada [aqui](https://github.com/oscargross/Nest-technical-test/blob/main/src/app.module.ts) 
# Basta configurar as variáveis de ambiente e o synchronize: true não é indicado para produção pois o TypeORM tempermissão para criar automaticamente a estrutura no banco com base nas entidades e é delicado ao se usar em produção.

$ import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: Number(configService.get('DB_PORT', 5432)),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'password'),
        database: configService.get('DB_DATABASE', 'mydb'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
```


Pergunta 2: Autenticação com Keycloak
Você está construindo uma API que requer autenticação e deseja usar o Keycloak como provedor de
identidade. Escreva o trecho de código em um controlador NestJS que mostra como proteger uma rota
usando a autenticação do Keycloak.

```bash
# Esse é o trecho de código em uma rota no Nest:


$ import { Controller, Get, UseGuards } from '@nestjs/common';
import { KeycloakAuthGuard } from './keycloak.guard';

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(KeycloakAuthGuard)
  getSomething() {
    return { message: 'This is a protected route.' };
  }
}


#O UseGuards() irá receber a estrategia de autenticação que precisa ser montada dessa forma:

$@Injectable()
export class KeycloakAuthGuard extends PassportStrategy(KeycloakStrategy, 'keycloak') {
  constructor(private readonly configService: ConfigService) {
    super({
      host: configService.get('KEYCLOAK_HOST'),
      realm: configService.get('KEYCLOAK_REALM'),
      clientId: configService.get('KEYCLOAK_CLIENT_ID'),
      clientSecret: configService.get('KEYCLOAK_CLIENT_SECRET'),
    });
  }
}

#E da mesma forma, o configService auxilia a coletar as variáveis de ambiente
```

Pergunta 3: Rota para Upload de Arquivos para o AWS S3
Imagine que você precise criar uma rota na sua aplicação para permitir o upload de arquivos
diretamente para o Amazon S3. Escreva o trecho de código de um controlador NestJS que lida com o
upload de um arquivo para o AWS S3 e utilize os conceitos básicos de AWS SDK.

```bash
# O Controller poderia ficar assim:
$ @Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const s3 = new AWS.S3();
    const params = {
      Bucket: 'bucket',
      Key: `uploads/${file.originalname}`,
      Body: file.buffer,
    };

    try {
      await s3.putObject(params).promise();
      return { message: 'Upload ok' };
    } catch (error) {
      return { error: 'Error' };
    }
  }
}

# E o AWS da lib 'aws-sdk' precisa ser configurada com as chaves de acesso da conta da AWS.

```

## Parte 3

1 - Primeiramente execute o docker-compose-up para rodar os bancos de dados (dev e testes).
```bash
$ docker-compose up -d 
#Certifique-se que todos os constainers estão ativos
```

2 - Execute o projeto e será possível testar a rota construída:
```bash
$ npm run start
```

3 - Execute a bateria de testes, que estão em 2 arquivos, referente a **Pergunta 4** e **Pergunta 5** da parte prática do teste:
```bash
$ npm run test
```



## License

Nest is [MIT licensed](LICENSE).

