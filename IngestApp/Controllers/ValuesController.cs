using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Threading.Tasks;
using System.IO;
using System.Net.Http.Headers;

namespace IngestApp.Controllers
{
 
    public class ValuesController : ApiController
    {
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }


        [HttpGet]
        [Route("GenerateVideoSummarization")]
        public HttpResponseMessage GenerateVideoSummarization(string ingestVideoUrl)
        {
            ingestVideoUrl = HttpUtility.UrlDecode(ingestVideoUrl);

            AzureMediaManagement mediaManagement = new AzureMediaManagement();
            string sessionName = "Session" + DateTime.Now.ToString("yyyyMddss");
            string sessionDirectory = HttpContext.Current.Server.MapPath("~/VideoRepository/" + sessionName);

            string outputFile = mediaManagement.ProcessAndDownload(ingestVideoUrl, sessionName);

            // Task deleteTask = Task.Factory.StartNew(() => { FileDeleter(sessionDirectory); });


            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            var stream = new FileStream(outputFile, FileMode.Open, FileAccess.Read);
            result.Content = new StreamContent(stream);
            result.Content.Headers.ContentType =
                new MediaTypeHeaderValue("application/octet-stream");
            return result;
        }



        public static async Task FileDeleter(string directoryName)
        {
            try
            {
                await Task.Delay(10000);

                if (System.IO.Directory.Exists(directoryName))
                    System.IO.Directory.Delete(directoryName);
            }
            catch (Exception)
            {


            }
        }
    }
}
