import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongocloud',
  connector: 'mongodb',
  url: 'mongodb+srv://projectDB3admin:projectDB3admin@cluster0.rbufh.mongodb.net/projectDB3',
  // url: 'mongodb+srv://platzi-admin:QOIM7cldJ52JXXEV@curso-platzi-q31zd.mongodb.net/projectDB3',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongocloudDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongocloud';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongocloud', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
