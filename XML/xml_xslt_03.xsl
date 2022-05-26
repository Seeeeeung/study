<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:template match="/">
		<html>
			<body>
				<h2 style="text-align:center">이름에 따른 오름차순 정렬</h2>
				<xsl:for-each select="programming_languages/language">
					<xsl:sort select="name" data-type="text" order="ascending"/>
					<xsl:value-of select="name"/><br/>
				</xsl:for-each>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>