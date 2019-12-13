using IBatisNet.Common.Utilities;
using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Configuration;
using System.Xml;

namespace YSN2017.Models{
    public class DaoFactory{

        private static object syncLock = new object();
        private static ISqlMapper mapper = null;


        public static ISqlMapper getInstance{

            get{

                try{

                    if (mapper == null){

                        lock (syncLock){

                            if (mapper == null){

                                DomSqlMapBuilder dom = new DomSqlMapBuilder();
                                XmlDocument sqlMapConf = Resources.GetEmbeddedResourceAsXmlDocument("YSN2017.SqlMap.config, YSN2017");
                                mapper = dom.Configure(sqlMapConf);

                            }

                        }

                    }

                }

                catch{

                    throw;

                }

                return mapper;

            }

        }

    }


}