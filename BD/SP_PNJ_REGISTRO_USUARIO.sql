CREATE DEFINER=`server`@`%` PROCEDURE `SP_PNJ_REGISTRO_USUARIO` (
IN web_usuario VARCHAR(85),
IN web_password VARCHAR(85),
IN web_nombre VARCHAR(150),
IN web_apellido VARCHAR(450),
IN web_correo VARCHAR(450)
)
BEGIN
INSERT INTO usuario (usuario, password, nombre, apellido, correo, id_tipousuario)
    VALUES (web_usuario, web_password, web_nombre, web_apellido, web_correo, 2);
END