namespace KIKAKU.Request {
  
  export var VERSION = '0.0.0';
  
  const URL_REGEX = /^(https?):\/\/((?:[a-z0-9.-]|%[0-9A-F]{2}){3,})(?::(\d+))?((?:\/(?:[a-z0-9-._~!$&'()*+,;=:@]|%[0-9A-F]{2})*)*)(?:\?((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?(?:#((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?$/i;

  function parseURL(url: string) {
    const m = URL_REGEX.exec(url);
    if (!m) {
      throw new Error('Invalid url');
    }
    return {
      scheme: m[1],
      host: m[2],
      port: m[3],
      path: m[4] + (m[5] ? `?${m[5]}` : ''),
      query: m[5],
      fragment: m[6],
    };
  }

  function supportScheme(scheme: string) {
    switch (scheme) {
      case 'http':
        return true;
    }
    return false;
  }

  function getPortFromShceme(scheme: string) {
    switch (scheme) {
      case 'http':
        return 80;
    }
    throw new Error('Invalid scheme');
  }

  function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }

  function createContent(options: PostOptions) {
    const {type, data} = options;
    switch (type) {
      case ContentType.FORM:
        let strs = [];
        for (let key in data) {
          strs.push(fixedEncodeURIComponent(key) + '=' + fixedEncodeURIComponent(data[key]));
        }
        return strs.join('&');
      case ContentType.JSON:
        return JSON.stringify(data);
    }
    throw new Error(`Invalid content type: ${type}`);
  }

  function createRequest(method: string, path: string, host: string, options: PostOptions): string {
    let request = `${method} ${path} HTTP/1.0`;
    let headers: { [name: string]: any; } = { 'HOST': host };
    let content = '';
    if (options) {
      content = createContent(options);
      if (content.length) {
        headers['Content-Type'] = options.type;
        headers['Content-Length'] = content.length;
      }
    }
    for (let name in headers) {
      request += `\r\n${name}: ${headers[name]}`;
    }
    request += '\r\n\r\n';
    if (content.length) {
      request += content;
    }
    return request;
  }

  function generateTemporaryPath(ext: string = '.txt') {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const temp_folder_path = Folder.temp.absoluteURI;
    let filename = '';
    while (true) {
      for (let i = 0; i < 16; ++i) {
        filename += characters[~~(Math.random() * characters.length)];
      }
      const file = new File(`${temp_folder_path}/${filename}${ext}`);
      if (!file.exists) {
        break;
      }
      filename = '';
    }
    return `${temp_folder_path}/${filename}${ext}`;
  }

  function createResponse(http_response: string): Response {
    const header_length = http_response.indexOf('\r\n\r\n');
    const header = http_response.substring(0, header_length);
    const body = http_response.substring(header_length + 4);
    let headers = header.split('\r\n');

    let response: Response = { statusCode: 0, reasonPhrase: '', headers: {}, body: '' };
    //status line
    {
      const status_line = headers.shift();
      const m = /^HTTP\/([\d\.]+)\s(\d+)\s(.*)$/.exec(status_line);
      response.statusCode = +m[2];
      response.reasonPhrase = m[3] || '';
    }
      
    //header
    {
      Utils.forEach(headers, (line: string) => {
        const m = /^(.*):\s(.*)$/.exec(line);
        if (m) {
          const name = m[1];
          const value = m[2];
          response.headers[name] = value;
        }
      });
    }
      
    //body
    {
      const temp_file = new File(generateTemporaryPath());
      temp_file.encoding = 'BINARY';
      if (!temp_file.open('w')) {
        throw new Error('File access denied')
      }
      temp_file.write(body);
      temp_file.close();
      temp_file.encoding = 'UTF-8';
      if (!temp_file.open('r')) {
        throw new Error('File access denied')
      }
      response.body = temp_file.read();
      temp_file.close();
      temp_file.remove();
    }

    return response;
  }

  export var ContentType = {
    JSON: 'application/json',
    FORM: 'application/x-www-form-urlencoded',
  };

  export type PostOptions = {
    type: string;
    data: { [name: string]: any };
  };

  export type Response = {
    statusCode: number;
    reasonPhrase: string;
    headers: { [key: string]: string; };
    body: string;
  };

  export type ResponseCallback = (response: Response) => void;

  function request(method: string, url: string, options: PostOptions, fn: ResponseCallback) {
    const parsed_url = parseURL(url);
    const {scheme, host, path, query, fragment} = parsed_url;
    if (!supportScheme(scheme)) {
      throw new Error(`'${scheme}' isn't supported`);
    }
    const port = parsed_url.port || getPortFromShceme(scheme);

    const socket = new Socket;
    if (!socket.open(`${host}:${port}`, 'BINARY')) {
      throw new Error('Unable to open socket');
    }

    let response: Response;
    try {
      let request = createRequest(method, path, host, options);
      socket.write(request);

      let http_response = '';
      while (!socket.eof) {
        http_response += socket.read();
      }
      response = createResponse(http_response);

    } catch (e) {
      throw e;
    } finally {
      socket.close();
    }

    fn(response);
  }

  export function get(url: string, fn: ResponseCallback) {
    request('GET', url, null, fn);
  }

  export function post(url: string, options: PostOptions, fn: ResponseCallback) {
    request('POST', url, options, fn);
  }

}