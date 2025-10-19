"use client";
import React, {  } from "react";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import { Colors } from "../constants/Colors";


type ThemeWrapperProps = {
  children: React.ReactNode;
};

const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  return (
    <>
      <ConfigProvider
        locale={ptBR}
        theme={{
          token: {
            colorPrimary: Colors.primary,
            fontFamily: "NewJune-Medium, sans-serif",
            fontFamilyCode: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
            colorLink: Colors.primary,
            borderRadius: 8,
            fontSize:  20,
            colorBorder: 'black',
            controlHeight: 48,
            lineHeight: 1.4
          },
          components: {
            Input: {
              borderRadius: 6,

              colorBorder: "black",
              paddingBlock:12,
              paddingInline:12,
              fontSize: 18,
              colorTextPlaceholder: "#a1a1a1",
              activeBorderColor: "black",
              hoverBorderColor: "black",
              colorBgContainer: "#fff",
              controlHeight:  50,
            },
            Radio: {
              radioSize:  22,
              dotSize:12,
              colorBgSolid: Colors.primary,
              colorBorder: Colors.primary,
              
            },
            Upload: {
              controlHeight: 48,
              borderRadius: 8,
            },
            Button:{
            
              colorPrimary: Colors.primary,
              colorBgContainer: Colors.colorButton,
              colorBgSpotlight:"#000"
            }
          },
        }}
      >
        {children}
      </ConfigProvider>
    </>
  )
}

export default ThemeWrapper;