# Hướng dẫn cài đặt và kết nối Github cho search-helu

## Giới thiệu

Gói `search-helu` là một công cụ hỗ trợ tìm kiếm [mô tả ngắn gọn về công cụ, ví dụ: "thông tin sản phẩm từ các nguồn khác nhau"]. Tài liệu này hướng dẫn bạn cách cài đặt gói và kết nối nó với kho lưu trữ Github của bạn.

## Cài đặt

Để cài đặt gói `search-helu`, hãy sử dụng trình quản lý gói npm (Node Package Manager). Đảm bảo rằng bạn đã cài đặt Node.js và npm trên hệ thống của mình.

1.  Mở terminal hoặc command prompt.
2.  Chuyển đến thư mục dự án của bạn.
3.  Chạy lệnh sau:

    ```bash
    npm install [https://github.com/ZNn9/search-helu.git](https://github.com/ZNn9/search-helu.git)
    ```

    Lệnh này sẽ tải xuống và cài đặt gói `search-helu` cùng với các phụ thuộc của nó vào thư mục `node_modules` trong dự án của bạn.

## Kết nối Github

Để kết nối kho lưu trữ Github của bạn với dự án, hãy thực hiện các bước sau:

1.  **Thêm remote origin:**

    ```bash
    git remote add origin [https://github.com/ZNn9/search-helu.git](https://github.com/ZNn9/search-helu.git)
    ```

    Lệnh này thêm một remote có tên `origin` trỏ đến kho lưu trữ Github của bạn. `origin` là một quy ước phổ biến cho remote chính của dự án.

2.  **Đổi tên nhánh mặc định thành `main`:**

    ```bash
    git branch -M main
    ```

    Trong những năm gần đây, nhánh mặc định của nhiều kho lưu trữ Git đã được đổi tên từ `master` thành `main`. Lệnh này đảm bảo rằng nhánh cục bộ của bạn có tên là `main`, phù hợp với kho lưu trữ từ xa.

3.  **Đẩy (push) nhánh `main` lên kho lưu trữ từ xa:**

    ```bash
    git push -u origin main
    ```

    Lệnh này đẩy nhánh `main` cục bộ của bạn lên kho lưu trữ `origin` trên Github. Cờ `-u` (upstream) thiết lập mối quan hệ theo dõi giữa nhánh cục bộ và nhánh từ xa, giúp bạn dễ dàng đẩy và kéo các thay đổi trong tương lai.

## Mẹo bổ sung

* Nếu bạn gặp bất kỳ vấn đề nào trong quá trình cài đặt hoặc kết nối, hãy tham khảo tài liệu chính thức của npm và Git.
* Bạn có thể sử dụng các công cụ Git GUI (Graphical User Interface) như GitHub Desktop hoặc SourceTree để quản lý kho lưu trữ của mình một cách dễ dàng hơn.
* Để cập nhật gói `search-helu` lên phiên bản mới nhất, hãy chạy lệnh `npm update search-helu`.

## Liên hệ

Nếu bạn có bất kỳ câu hỏi hoặc phản hồi nào, vui lòng liên hệ với chúng tôi qua [thông tin liên hệ của bạn, ví dụ: email, trang web].