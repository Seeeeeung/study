<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:template match="/">

		<html>
			<body>
				<h2 style="text-align:center">버전이 5.0 이상인 언어</h2>
				<xsl:for-each select="programming_languages/language">
					<xsl:if test="version &gt; 5">
						<xsl:value-of select="name"/> : ver.
						<xsl:value-of select="version"/><br/>
					</xsl:if>
				</xsl:for-each>
			</body>
		</html>

	</xsl:template>
</xsl:stylesheet>