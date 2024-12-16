-- DropForeignKey
ALTER TABLE `auditlog` DROP FOREIGN KEY `AuditLog_featureId_fkey`;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_featureId_fkey` FOREIGN KEY (`featureId`) REFERENCES `FeatureToggle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
