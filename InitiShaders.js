var shaderProgram;
    function iniciarShaders()
    {
      var vertexShader = getShader(gl, "#shader-vs");
      var fragmentShader = getShader(gl, "#shader-fs");
      
      shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);
      
      if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
      {
			alert("Não pode inicializar shaders");
      }
      
      gl.useProgram(shaderProgram);
      
      shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
      gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
      
      shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, 
		    "uPMatrix");
      shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, 
		    "uVMatrix");
      shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, 
		    "uMMatrix");
      
      
    }
    
    function getShader(gl, id)
    {
      var shaderScript = $(id)[0];
      if(!shaderScript) 
      {
	return null;
      }
      
      var str = "";
      var k = shaderScript.firstChild;
      while(k)
      {
	if(k.nodeType == 3)
	  str += k.textContent;
		k = k.nextSibling;
      }
      
      var shader;
      if(shaderScript.type == "x-shader/x-fragment")
      {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
      }
      else if(shaderScript.type == "x-shader/x-vertex")
      {
		shader = gl.createShader(gl.VERTEX_SHADER);
      }
      else
      {
	return null;
      }
      
      gl.shaderSource(shader, str);
      gl.compileShader(shader);
      
      if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      {
	alert(gl.getShaderInfoLog(shader));
	return null;
      }
      
      return shader;
    }