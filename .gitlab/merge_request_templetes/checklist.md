## Checklist

**Technical:**

- [ ] Tất cả các action phải extend `BaseClass`.
- [ ] Tất cả các controller phải extend `BaseController`.
- [ ] Tất cả các http-service phải extend `BaseHttpService`.
- [ ] Tất cả các repository phải extend `BaseRepository`.
- [ ] Những class nào mà có method async, thì nên extend `BaseClass`.
- [ ] Khi tạo controller mới, cần khởi tạo thuộc tính `issuer` để hỗ trợ server log.
- [ ] Đảm bảo validate hết data từ request trước khi vào controller(data từ request trong controller phải sạch).
- [ ] Khi tạo model mới cho sequelize thì phải khai báo model đấy trong `/sequelize/models/index.js`.
- [ ] Khi tự thêm try-catch, vẫn phải throw ra lỗi gốc để server có thể log đúng lỗi.
- [ ] Trong controller, khi next ra lỗi, thì phải bọc lỗi trong `this.instanceError()`.
- [ ] Trong 1 hoặc nhiều service, mà xuất hiện thêm-sửa-xóa trên nhiều bảng phải apply cơ chế commit-rollback trên service hiện tại và các service khác(nếu có).
- [ ] Các hàm trong repository mà liên quan đến thêm-sửa-xóa, phải thêm tham số trx(default=null) để truyền `transaction` lấy từ sequelize vào.

**Business:**

- [ ] Nếu chưa rõ requirement, confirm với BA để đảm bảo đúng flow chương trình.
