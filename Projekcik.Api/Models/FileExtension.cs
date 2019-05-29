using System.Net.Http;

namespace Projekcik.Api.Models
{
    public enum Extension
    {
        PDF,
        DOC,
        DOCX,
        JPG,
        JPEG,
        ODP,
        ODT,
        ODS,
        PPT,
        PPTX,
        RAR,
        RTF,
        XLS,
        XLSX,
        ZIP
    }

    public static class FileType
    {
        public static string ToContentType(Extension e)
        {
            switch (e)
            {
                case Extension.DOC: return "application/msword";
                case Extension.DOCX: return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                case Extension.JPG: return "image/jpeg";
                case Extension.JPEG: return "image/jpeg";
                case Extension.ODP: return "application/vnd.oasis.opendocument.presentation";
                case Extension.ODS: return "application/vnd.oasis.opendocument.spreadsheet";
                case Extension.ODT: return "application/vnd.oasis.opendocument.text";
                case Extension.PDF: return "application/pdf";
                case Extension.PPT: return "application/vnd.ms-powerpoint";
                case Extension.PPTX: return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
                case Extension.RAR: return "application/x-rar-compressed";
                case Extension.RTF: return "application/rtf";
                case Extension.XLS: return "application/vnd.ms-excel";
                case Extension.XLSX: return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                case Extension.ZIP: return "application/zip";
                default:
                    throw new UnsupportedMediaTypeException("Unupported", null);
                    ;
            }
        }
    }
}