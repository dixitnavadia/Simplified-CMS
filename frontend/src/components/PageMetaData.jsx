import React, { useState, useEffect } from 'react';

const PageMetaData = ({ elements, onMetaDataChange }) => {
  const [metaData, setMetaData] = useState([]);

  // Convert element to metadata format
  const elementToMetaData = (element, index) => {
    const baseMetaData = {
      id: index,
      type: getHtmlTag(element.type),
      properties: {},
      attributes: {}
    };

    switch (element.type) {
      case 'header':
        return {
          ...baseMetaData,
          type: 'h1',
          properties: {
            fontSize: element.fontSize || '32px',
            fontWeight: element.fontWeight || '700',
            fontFamily: element.fontFamily || 'Roboto, sans-serif',
            color: element.fontColor || '#fff',
            fontStyle: element.isItalic ? 'italic' : 'normal',
            textDecoration: element.isUnderline ? 'underline' : 'none',
            verticalAlign: element.isSubscript ? 'sub' : element.isSuperscript ? 'super' : 'baseline',
          },
          attributes: {
            value: element.text || 'Header',
            contentEditable: true,
            isBold: element.isBold || false,
            isItalic: element.isItalic || false,
            isUnderline: element.isUnderline || false,
            isSubscript: element.isSubscript || false,
            isSuperscript: element.isSuperscript || false,
          }
        };

      case 'paragraph':
        return {
          ...baseMetaData,
          type: 'p',
          properties: {
            fontSize: element.fontSize || '16px',
            fontWeight: element.fontWeight || '400',
            fontFamily: element.fontFamily || 'Roboto, sans-serif',
            color: element.fontColor || '#fff',
            fontStyle: element.isItalic ? 'italic' : 'normal',
            textDecoration: element.isUnderline ? 'underline' : 'none',
            verticalAlign: element.isSubscript ? 'sub' : element.isSuperscript ? 'super' : 'baseline',
          },
          attributes: {
            value: element.text || 'Paragraph',
            contentEditable: true,
            isBold: element.isBold || false,
            isItalic: element.isItalic || false,
            isUnderline: element.isUnderline || false,
            isSubscript: element.isSubscript || false,
            isSuperscript: element.isSuperscript || false,
          }
        };

      case 'image':
        return {
          ...baseMetaData,
          type: 'img',
          properties: {
            width: element.width || '120px',
            height: element.height || '120px',
            objectFit: 'cover',
            borderRadius: '10px',
            border: '1px solid #444',
            display: 'block'
          },
          attributes: {
            src: element.src || '',
            alt: element.alt || 'Image',
          }
        };

      default:
        return baseMetaData;
    }
  };

  // Helper function to get HTML tag from element type
  const getHtmlTag = (type) => {
    const tagMap = {
      'header': 'h1',
      'paragraph': 'p',
      'image': 'img'
    };
    return tagMap[type] || 'div';
  };

  // Update metadata whenever elements change
  useEffect(() => {
    const newMetaData = elements.map((element, index) => elementToMetaData(element, index));
    setMetaData(newMetaData);
    
    // Enhanced console logging for debugging
    console.group('📊 Page Metadata Updated');
    console.log('Elements Count:', elements.length);
    console.log('Generated Metadata:', newMetaData);
    
    // Enhanced table with more styling properties
    console.table(newMetaData.map(meta => ({
      ID: meta.id,
      Type: meta.type,
      Text: meta.attributes.value || meta.attributes.src || 'N/A',
      FontSize: meta.properties.fontSize || 'N/A',
      FontWeight: meta.properties.fontWeight || 'N/A',
      Bold: meta.attributes.isBold || false,
      Italic: meta.attributes.isItalic || false,
      Underline: meta.attributes.isUnderline || false,
      Subscript: meta.attributes.isSubscript || false,
      Superscript: meta.attributes.isSuperscript || false,
      FontStyle: meta.properties.fontStyle || 'normal',
      TextDecoration: meta.properties.textDecoration || 'none',
      VerticalAlign: meta.properties.verticalAlign || 'baseline'
    })));
    
    // Log individual elements for detailed inspection
    elements.forEach((element, index) => {
      if (element.type === 'header' || element.type === 'paragraph') {
        console.log(`Element ${index} (${element.type}) properties:`, {
          isBold: element.isBold,
          isItalic: element.isItalic,
          isUnderline: element.isUnderline,
          isSubscript: element.isSubscript,
          isSuperscript: element.isSuperscript,
          fontWeight: element.fontWeight,
          fontColor: element.fontColor,
          fontSize: element.fontSize
        });
      }
    });
    
    console.groupEnd();
    
    // Save to localStorage
    localStorage.setItem('page-metadata', JSON.stringify(newMetaData));
    
    // Notify parent component if callback provided
    if (onMetaDataChange) {
      onMetaDataChange(newMetaData);
    }
  }, [elements, onMetaDataChange]);

  // Load metadata from localStorage on mount
  useEffect(() => {
    const savedMetaData = localStorage.getItem('page-metadata');
    if (savedMetaData) {
      try {
        const parsedMetaData = JSON.parse(savedMetaData);
        setMetaData(parsedMetaData);
        console.log('🔄 Loaded metadata from localStorage:', parsedMetaData);
      } catch (error) {
        console.error('❌ Failed to parse saved metadata:', error);
      }
    }
  }, []);

  // Export metadata as JSON
  const exportMetaData = () => {
    console.log('💾 Exporting metadata:', metaData);
    const dataStr = JSON.stringify(metaData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'page-metadata.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    console.log('✅ Metadata export initiated');
  };

  // Get metadata for specific element
  const getElementMetaData = (elementId) => {
    const elementMeta = metaData.find(meta => meta.id === elementId);
    console.log(`🔍 Getting metadata for element ${elementId}:`, elementMeta);
    return elementMeta;
  };

  // Update specific element metadata
  const updateElementMetaData = (elementId, updates) => {
    console.log(`✏️ Updating metadata for element ${elementId}:`, updates);
    
    const updatedMetaData = metaData.map(meta => {
      if (meta.id === elementId) {
        const updated = {
          ...meta,
          ...updates,
          properties: { ...meta.properties, ...(updates.properties || {}) },
          attributes: { ...meta.attributes, ...(updates.attributes || {}) }
        };
        console.log(`🔄 Element ${elementId} metadata updated:`, updated);
        return updated;
      }
      return meta;
    });
    
    setMetaData(updatedMetaData);
    localStorage.setItem('page-metadata', JSON.stringify(updatedMetaData));
    
    if (onMetaDataChange) {
      onMetaDataChange(updatedMetaData);
    }
  };

  // Expose methods and data
  return {
    metaData,
    exportMetaData,
    getElementMetaData,
    updateElementMetaData
  };
};

export default PageMetaData;