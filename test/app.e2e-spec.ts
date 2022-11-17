import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { UsersDto } from '../src/users/dto/users.dto';
import { AppModule } from '../src/app.module';

describe('App e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Users', () => {
    const dto: UsersDto = {
      name: 'Amana',
      email: 'amana@gmail.com',
    };

    describe('Signup', () => {
      it('it should throw 400 if name is empty', () => {
        return pactum
          .spec()
          .post('/signup')
          .withBody({
            email: 'amana@gmail.com',
          })
          .expectStatus(400);
        // .inspect();
      });

      it('it should throw 400 if email is empty', () => {
        return pactum
          .spec()
          .post('/signup')
          .withBody({
            name: 'Amana',
          })
          .expectStatus(400);
        // .inspect();
      });

      it('it should throw 400 if email is incorrect', () => {
        return pactum
          .spec()
          .post('/signup')
          .withBody({
            name: 'Amana',
            email: 'amana',
          })
          .expectStatus(400);
        // .inspect();
      });

      it('it should throw 400 if no dto', () => {
        return pactum.spec().post('/signup').withBody({}).expectStatus(400);
        // .inspect();
      });

      it('it should signup', () => {
        return pactum
          .spec()
          .post('/signup')
          .withBody(dto)
          .expectStatus(201)
          .stores('uId', 'userId')
          .inspect();
      });
    });

    describe('Login', () => {
      it('it should throw 400 if name is empty', () => {
        return pactum
          .spec()
          .post('/login')
          .withBody({
            email: 'amana@gmail.com',
          })
          .expectStatus(400);
        // .inspect();
      });

      it('it should throw 400 if email is empty', () => {
        return pactum
          .spec()
          .post('/login')
          .withBody({
            name: 'Amana',
          })
          .expectStatus(400);
        // .inspect();
      });

      it('it should throw 400 if email is incorrect', () => {
        return pactum
          .spec()
          .post('/login')
          .withBody({
            name: 'Amana',
            email: 'amana',
          })
          .expectStatus(400);
        // .inspect();
      });

      it('it should throw 400 if no dto', () => {
        return pactum.spec().post('/login').withBody({}).expectStatus(400);
        // .inspect();
      });

      it('It should login', () => {
        return pactum
          .spec()
          .post('/login')
          .withBody(dto)
          .expectStatus(201)
          .stores('userAccessToken', 'access_token');
        // .inspect();
      });
    });

    describe('GetSurveyor', () => {
      it('it should throw if no token', () => {
        return pactum
          .spec()
          .get('/getSurveyor')
          .withHeaders({})
          .expectStatus(401);
      });

      it('it should get current surveyor', () => {
        return pactum
          .spec()
          .get('/getSurveyor')
          .withHeaders({ Authorization: `Bearer $S{userAccessToken}` })
          .expectStatus(200);
      });
    });
  });

  describe('Survey', () => {
    describe('Get all empty Surveys', () => {
      it('it should get empty array', () => {
        return pactum
          .spec()
          .get('/allSurveys')
          .withHeaders({ Authorization: `Bearer $S{userAccessToken}` })
          .expectStatus(200)
          .expectBody([]);
        // .inspect();
      });
    });
    describe('Create Survey', () => {
      const dto = {
        title: 'First Survey',
        createdBy: '$S{uId}',
      };
      it('it should create a survey', () => {
        return pactum
          .spec()
          .post('/create')
          .withBody(dto)
          .withHeaders({ Authorization: `Bearer $S{userAccessToken}` })
          .expectStatus(201)
          .stores('surveyId', 'id');
        // .inspect();
      });
    });
    describe('Get Survey By ID', () => {
      it('should get survey by id', () => {
        return pactum
          .spec()
          .get('/survey/{id}')
          .withPathParams('id', '$S{surveyId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{surveyId}');
        // .inspect();
      });
    });
    describe('Get all Surveys', () => {
      it('it should get an array of length', () => {
        return pactum
          .spec()
          .get('/allSurveys')
          .withHeaders({ Authorization: `Bearer $S{userAccessToken}` })
          .expectStatus(200)
          .expectJsonLength(1);
        // .inspect();
      });
    });
    describe('Delete Survey', () => {
      it('it should delete survey by id', () => {
        return pactum
          .spec()
          .delete('/survey/{id}')
          .withPathParams('id', '$S{surveyId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}',
          })
          .expectStatus(204)
          .inspect();
      });
    });
    // describe('Update Survey', () => {});
    // describe('Extract Css', () => {});
  });

  // describe('Result', () => {
  //   // Below means to complete the survey
  //   describe('Create Results', () => {});
  //   describe('Get All Results', () => {});
  //   describe('Get Result By ID', () => {});
  // });
});
