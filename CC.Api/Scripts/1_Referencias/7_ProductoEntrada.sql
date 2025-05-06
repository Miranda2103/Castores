DECLARE @constraintName NVARCHAR(128), @referencingTable NVARCHAR(128), @sql NVARCHAR(MAX);

DECLARE foreign_keys CURSOR FOR
SELECT fk.name, OBJECT_NAME(fk.parent_object_id)
FROM sys.foreign_keys fk
WHERE fk.referenced_object_id = OBJECT_ID('dbo.ProductoEntrada');

OPEN foreign_keys;
FETCH NEXT FROM foreign_keys INTO @constraintName, @referencingTable;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Construye la instrucción para eliminar la clave foránea
    SET @sql = 'ALTER TABLE ' + @referencingTable + ' DROP CONSTRAINT ' + @constraintName;
    EXEC sp_executesql @sql;

    FETCH NEXT FROM foreign_keys INTO @constraintName, @referencingTable;
END

CLOSE foreign_keys;
DEALLOCATE foreign_keys;