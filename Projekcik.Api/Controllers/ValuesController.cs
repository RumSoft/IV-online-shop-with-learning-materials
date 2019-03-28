using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Projekcik.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        public static List<Message> Values { get; set; } = new List<Message>
        {
            new Message {Text = "witam"},
            new Message {Text = "pozdrawiam"}
        };

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return Ok(Values.Select(x => x.Text));
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Message> Get(int id)
        {
            if (id >= Values.Count)
                return BadRequest("id too big xd");

            return Ok(Values[id]);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
            Values.Add(new Message {Text = value});
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            if (id >= Values.Count)
                throw new ArgumentOutOfRangeException(nameof(id));

            Values[id].Text = value;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            if (id >= Values.Count)
                throw new ArgumentOutOfRangeException(nameof(id));

            Values.RemoveAt(id);
        }

        public class Message
        {
            public string Text { get; set; }
        }
    }
}